"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
var node_crypto_1 = require("node:crypto");
var common_1 = require("@nestjs/common");
var client_s3_1 = require("@aws-sdk/client-s3");
var s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
var storage_constants_1 = require("./storage.constants");
/**
 * Wraps the S3 client for a private bucket. Stores object *keys* (not URLs) and
 * mints short-lived presigned URLs: PUT for uploads, GET for reads. Key layout
 * is `{categoryPrefix}/{ownerId}/{uuid}.{ext}` so the bucket browses by model.
 */
var StorageService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var StorageService = _classThis = /** @class */ (function () {
        function StorageService_1(config) {
            this.logger = new common_1.Logger(StorageService.name);
            this.cfg = config.getOrThrow('storage');
            this.client = this.isConfigured
                ? new client_s3_1.S3Client({
                    region: this.cfg.region,
                    credentials: {
                        accessKeyId: this.cfg.accessKeyId,
                        secretAccessKey: this.cfg.secretAccessKey,
                    },
                })
                : null;
            if (!this.isConfigured) {
                this.logger.warn('AWS S3 not configured (AWS_S3_BUCKET / credentials missing) — uploads will fail until set.');
            }
        }
        Object.defineProperty(StorageService_1.prototype, "isConfigured", {
            get: function () {
                return Boolean(this.cfg.bucket && this.cfg.accessKeyId && this.cfg.secretAccessKey);
            },
            enumerable: false,
            configurable: true
        });
        StorageService_1.prototype.requireClient = function () {
            if (!this.client) {
                throw new common_1.BadRequestException('File storage is not configured on this server.');
            }
            return this.client;
        };
        /** Build a presigned PUT URL for one file and the key to persist alongside it. */
        StorageService_1.prototype.createUploadUrl = function (args) {
            return __awaiter(this, void 0, void 0, function () {
                var client, rule, contentType, ext, key, command, uploadUrl;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            client = this.requireClient();
                            rule = storage_constants_1.CATEGORY_RULES[args.category];
                            if (rule.scope !== args.scope) {
                                throw new common_1.BadRequestException("Category ".concat(args.category, " cannot be uploaded in this context."));
                            }
                            contentType = args.contentType.toLowerCase();
                            if (!rule.allowedMime.includes(contentType)) {
                                throw new common_1.BadRequestException("Unsupported file type \"".concat(contentType, "\" for ").concat(args.category, ". Allowed: ").concat(rule.allowedMime.join(', '), "."));
                            }
                            ext = this.extensionFor(contentType, args.filename);
                            key = "".concat(rule.prefix, "/").concat(args.ownerId, "/").concat((0, node_crypto_1.randomUUID)(), ".").concat(ext);
                            command = new client_s3_1.PutObjectCommand({
                                Bucket: this.cfg.bucket,
                                Key: key,
                                ContentType: contentType,
                            });
                            return [4 /*yield*/, (0, s3_request_presigner_1.getSignedUrl)(client, command, {
                                    expiresIn: this.cfg.uploadExpirySeconds,
                                })];
                        case 1:
                            uploadUrl = _a.sent();
                            return [2 /*return*/, {
                                    key: key,
                                    uploadUrl: uploadUrl,
                                    method: 'PUT',
                                    contentType: contentType,
                                    expiresIn: this.cfg.uploadExpirySeconds,
                                    maxBytes: rule.maxBytes,
                                }];
                    }
                });
            });
        };
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
        StorageService_1.prototype.canResolveKey = function (key, userId, isPlatformAdmin) {
            if (/^https?:\/\//i.test(key))
                return true;
            if (isPlatformAdmin)
                return true;
            var privatePrefixes = Object.values(storage_constants_1.CATEGORY_RULES)
                .filter(function (rule) { return rule.private; })
                .map(function (rule) { return rule.prefix; });
            var isPrivate = privatePrefixes.some(function (prefix) { return key.startsWith("".concat(prefix, "/")); });
            if (!isPrivate)
                return true;
            var segments = key.split('/');
            var ownerId = segments.length >= 2 ? segments[segments.length - 2] : null;
            return ownerId === userId;
        };
        /**
         * Turn a stored object key into a presigned GET URL for display/download.
         * Returns absolute http(s) values unchanged (legacy / external URLs) and
         * passes through empty values as null so mappers stay simple.
         *
         * Callers reached from user input must check `canResolveKey` first — this
         * method itself signs whatever it is handed.
         */
        StorageService_1.prototype.getDownloadUrl = function (keyOrUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var client, command;
                return __generator(this, function (_a) {
                    if (!keyOrUrl)
                        return [2 /*return*/, null];
                    if (/^https?:\/\//i.test(keyOrUrl))
                        return [2 /*return*/, keyOrUrl];
                    client = this.requireClient();
                    command = new client_s3_1.GetObjectCommand({ Bucket: this.cfg.bucket, Key: keyOrUrl });
                    return [2 /*return*/, (0, s3_request_presigner_1.getSignedUrl)(client, command, { expiresIn: this.cfg.downloadExpirySeconds })];
                });
            });
        };
        /** Presign a list of keys (preserves order; skips empties). */
        StorageService_1.prototype.getDownloadUrls = function (keys) {
            return __awaiter(this, void 0, void 0, function () {
                var signed;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all(keys.map(function (k) { return _this.getDownloadUrl(k); }))];
                        case 1:
                            signed = _a.sent();
                            return [2 /*return*/, signed.filter(function (u) { return Boolean(u); })];
                    }
                });
            });
        };
        /** Permanently delete an object (e.g. when an image is replaced). No-op for empty/external values. */
        StorageService_1.prototype.delete = function (keyOrUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var client;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!keyOrUrl || /^https?:\/\//i.test(keyOrUrl))
                                return [2 /*return*/];
                            client = this.requireClient();
                            return [4 /*yield*/, client.send(new client_s3_1.DeleteObjectCommand({ Bucket: this.cfg.bucket, Key: keyOrUrl }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Best-effort bulk delete used to clean up objects orphaned when an image is
         * replaced. Never throws — a failed delete just leaves an orphan (logged), so
         * it can be safely awaited after a successful DB write without risking the
         * mutation. Empty / external values are skipped.
         */
        StorageService_1.prototype.deleteMany = function (keys) {
            return __awaiter(this, void 0, void 0, function () {
                var targets, results, failed;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            targets = keys.filter(function (k) { return Boolean(k) && !/^https?:\/\//i.test(k); });
                            if (!targets.length)
                                return [2 /*return*/];
                            return [4 /*yield*/, Promise.allSettled(targets.map(function (k) { return _this.delete(k); }))];
                        case 1:
                            results = _a.sent();
                            failed = results.filter(function (r) { return r.status === 'rejected'; }).length;
                            if (failed) {
                                this.logger.warn("Failed to delete ".concat(failed, "/").concat(targets.length, " orphaned S3 object(s)."));
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        StorageService_1.prototype.extensionFor = function (contentType, filename) {
            var _a;
            var fromMime = storage_constants_1.MIME_EXTENSION[contentType];
            if (fromMime)
                return fromMime;
            var fromName = (_a = filename === null || filename === void 0 ? void 0 : filename.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            return fromName && /^[a-z0-9]{1,5}$/.test(fromName) ? fromName : 'bin';
        };
        return StorageService_1;
    }());
    __setFunctionName(_classThis, "StorageService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StorageService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StorageService = _classThis;
}();
exports.StorageService = StorageService;
