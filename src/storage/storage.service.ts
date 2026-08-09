import { randomUUID } from 'node:crypto';

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import type { StorageConfig } from '../config/storage.config';
import { PresignedUpload } from './dto/presigned-upload.model';
import {
  CATEGORY_RULES,
  MIME_EXTENSION,
  UploadCategory,
  type UploadScope,
} from './storage.constants';

interface CreateUploadArgs {
  category: UploadCategory;
  contentType: string;
  /** Id of the principal uploading — used as the second key segment for traceability. */
  ownerId: string;
  /** The caller's scope; must satisfy the category's required scope. */
  scope: UploadScope;
  filename?: string;
}

/**
 * Wraps the S3 client for a private bucket. Stores object *keys* (not URLs) and
 * mints short-lived presigned URLs: PUT for uploads, GET for reads. Key layout
 * is `{categoryPrefix}/{ownerId}/{uuid}.{ext}` so the bucket browses by model.
 */
@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly cfg: StorageConfig;
  private readonly client: S3Client | null;

  constructor(config: ConfigService) {
    this.cfg = config.getOrThrow<StorageConfig>('storage');
    this.client = this.isConfigured
      ? new S3Client({
          region: this.cfg.region,
          credentials: {
            accessKeyId: this.cfg.accessKeyId,
            secretAccessKey: this.cfg.secretAccessKey,
          },
        })
      : null;
    if (!this.isConfigured) {
      this.logger.warn(
        'AWS S3 not configured (AWS_S3_BUCKET / credentials missing) — uploads will fail until set.',
      );
    }
  }

  private get isConfigured(): boolean {
    return Boolean(this.cfg.bucket && this.cfg.accessKeyId && this.cfg.secretAccessKey);
  }

  private requireClient(): S3Client {
    if (!this.client) {
      throw new BadRequestException('File storage is not configured on this server.');
    }
    return this.client;
  }

  /** Build a presigned PUT URL for one file and the key to persist alongside it. */
  async createUploadUrl(args: CreateUploadArgs): Promise<PresignedUpload> {
    const client = this.requireClient();
    const rule = CATEGORY_RULES[args.category];

    if (rule.scope !== args.scope) {
      throw new BadRequestException(
        `Category ${args.category} cannot be uploaded in this context.`,
      );
    }
    const contentType = args.contentType.toLowerCase();
    if (!rule.allowedMime.includes(contentType)) {
      throw new BadRequestException(
        `Unsupported file type "${contentType}" for ${args.category}. Allowed: ${rule.allowedMime.join(', ')}.`,
      );
    }

    const ext = this.extensionFor(contentType, args.filename);
    const key = `${rule.prefix}/${args.ownerId}/${randomUUID()}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: this.cfg.bucket,
      Key: key,
      ContentType: contentType,
    });
    const uploadUrl = await getSignedUrl(client, command, {
      expiresIn: this.cfg.uploadExpirySeconds,
    });

    return {
      key,
      uploadUrl,
      method: 'PUT',
      contentType,
      expiresIn: this.cfg.uploadExpirySeconds,
      maxBytes: rule.maxBytes,
    };
  }

  /**
   * May `userId` resolve `key` into a download URL on their own say-so?
   *
   * Keys are `{prefix}/{ownerId}/{uuid}.{ext}`, so the uploader is the
   * second-to-last segment. Most categories are marketplace display assets —
   * a venue's cover photo is meant to be seen by strangers, and its key is
   * handed out by public queries — so those stay open to any signed-in caller.
   * Categories marked `private` are KYC papers: only the person who uploaded
   * them, and the platform, have any business fetching those.
   *
   * This governs the free-form `mediaUrl` entry point only. Field resolvers
   * that presign a key they just read from a record the caller was authorised
   * to fetch don't come through here — that authorisation already happened,
   * and `VenueService.redactVenue` is what decides it for venue documents.
   */
  canResolveKey(key: string, userId: string, isPlatformAdmin: boolean): boolean {
    if (/^https?:\/\//i.test(key)) return true;
    if (isPlatformAdmin) return true;

    const privatePrefixes = Object.values(CATEGORY_RULES)
      .filter((rule) => rule.private)
      .map((rule) => rule.prefix);
    const isPrivate = privatePrefixes.some((prefix) => key.startsWith(`${prefix}/`));
    if (!isPrivate) return true;

    const segments = key.split('/');
    const ownerId = segments.length >= 2 ? segments[segments.length - 2] : null;
    return ownerId === userId;
  }

  /**
   * Turn a stored object key into a presigned GET URL for display/download.
   * Returns absolute http(s) values unchanged (legacy / external URLs) and
   * passes through empty values as null so mappers stay simple.
   *
   * Callers reached from user input must check `canResolveKey` first — this
   * method itself signs whatever it is handed.
   */
  async getDownloadUrl(keyOrUrl: string | null | undefined): Promise<string | null> {
    if (!keyOrUrl) return null;
    if (/^https?:\/\//i.test(keyOrUrl)) return keyOrUrl;
    const client = this.requireClient();
    const command = new GetObjectCommand({ Bucket: this.cfg.bucket, Key: keyOrUrl });
    return getSignedUrl(client, command, { expiresIn: this.cfg.downloadExpirySeconds });
  }

  /** Presign a list of keys (preserves order; skips empties). */
  async getDownloadUrls(keys: ReadonlyArray<string | null | undefined>): Promise<string[]> {
    const signed = await Promise.all(keys.map((k) => this.getDownloadUrl(k)));
    return signed.filter((u): u is string => Boolean(u));
  }

  /** Permanently delete an object (e.g. when an image is replaced). No-op for empty/external values. */
  async delete(keyOrUrl: string | null | undefined): Promise<void> {
    if (!keyOrUrl || /^https?:\/\//i.test(keyOrUrl)) return;
    const client = this.requireClient();
    await client.send(new DeleteObjectCommand({ Bucket: this.cfg.bucket, Key: keyOrUrl }));
  }

  /**
   * Best-effort bulk delete used to clean up objects orphaned when an image is
   * replaced. Never throws — a failed delete just leaves an orphan (logged), so
   * it can be safely awaited after a successful DB write without risking the
   * mutation. Empty / external values are skipped.
   */
  async deleteMany(keys: ReadonlyArray<string | null | undefined>): Promise<void> {
    const targets = keys.filter((k): k is string => Boolean(k) && !/^https?:\/\//i.test(k!));
    if (!targets.length) return;
    const results = await Promise.allSettled(targets.map((k) => this.delete(k)));
    const failed = results.filter((r) => r.status === 'rejected').length;
    if (failed) {
      this.logger.warn(`Failed to delete ${failed}/${targets.length} orphaned S3 object(s).`);
    }
  }

  private extensionFor(contentType: string, filename?: string): string {
    const fromMime = MIME_EXTENSION[contentType];
    if (fromMime) return fromMime;
    const fromName = filename?.split('.').pop()?.toLowerCase();
    return fromName && /^[a-z0-9]{1,5}$/.test(fromName) ? fromName : 'bin';
  }
}
