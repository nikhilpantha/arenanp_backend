"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageConfig = void 0;
var config_1 = require("@nestjs/config");
/**
 * AWS S3 storage settings. The bucket is private (block-all-public-access); the
 * backend stores object *keys* in the DB and issues short-lived presigned URLs
 * for upload (PUT) and download (GET). See scripts/aws/ for the bucket + IAM setup.
 */
exports.storageConfig = (0, config_1.registerAs)('storage', function () {
    var _a, _b, _c, _d, _e, _f;
    return ({
        region: (_a = process.env.AWS_REGION) !== null && _a !== void 0 ? _a : 'ap-south-1',
        bucket: (_b = process.env.AWS_S3_BUCKET) !== null && _b !== void 0 ? _b : '',
        accessKeyId: (_c = process.env.AWS_ACCESS_KEY_ID) !== null && _c !== void 0 ? _c : '',
        secretAccessKey: (_d = process.env.AWS_SECRET_ACCESS_KEY) !== null && _d !== void 0 ? _d : '',
        // Upload URLs are short-lived: the client should PUT immediately after asking.
        uploadExpirySeconds: parseInt((_e = process.env.S3_PRESIGN_EXPIRY_SECONDS) !== null && _e !== void 0 ? _e : '900', 10),
        // Download URLs are signed on read and embedded in API responses; a longer
        // window keeps gallery images from expiring while a screen is open.
        downloadExpirySeconds: parseInt((_f = process.env.S3_DOWNLOAD_EXPIRY_SECONDS) !== null && _f !== void 0 ? _f : '3600', 10),
    });
});
