import { registerAs } from '@nestjs/config';

/**
 * AWS S3 storage settings. The bucket is private (block-all-public-access); the
 * backend stores object *keys* in the DB and issues short-lived presigned URLs
 * for upload (PUT) and download (GET). See scripts/aws/ for the bucket + IAM setup.
 */
export const storageConfig = registerAs('storage', () => ({
  region: process.env.AWS_REGION ?? 'ap-south-1',
  bucket: process.env.AWS_S3_BUCKET ?? '',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  // Upload URLs are short-lived: the client should PUT immediately after asking.
  uploadExpirySeconds: parseInt(process.env.S3_PRESIGN_EXPIRY_SECONDS ?? '900', 10),
  // Download URLs are signed on read and embedded in API responses; a longer
  // window keeps gallery images from expiring while a screen is open.
  downloadExpirySeconds: parseInt(process.env.S3_DOWNLOAD_EXPIRY_SECONDS ?? '3600', 10),
}));

export type StorageConfig = ReturnType<typeof storageConfig>;
