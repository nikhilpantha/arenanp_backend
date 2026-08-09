"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConfig = void 0;
var config_1 = require("@nestjs/config");
exports.redisConfig = (0, config_1.registerAs)('redis', function () {
    var _a, _b, _c, _d;
    return ({
        host: (_a = process.env.REDIS_HOST) !== null && _a !== void 0 ? _a : 'localhost',
        port: parseInt((_b = process.env.REDIS_PORT) !== null && _b !== void 0 ? _b : '6379', 10),
        password: process.env.REDIS_PASSWORD || undefined,
        db: parseInt((_c = process.env.REDIS_DB) !== null && _c !== void 0 ? _c : '0', 10),
        tls: ((_d = process.env.REDIS_TLS) !== null && _d !== void 0 ? _d : 'false').toLowerCase() === 'true',
    });
});
