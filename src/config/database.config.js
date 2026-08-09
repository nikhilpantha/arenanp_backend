"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
var config_1 = require("@nestjs/config");
exports.databaseConfig = (0, config_1.registerAs)('database', function () {
    var _a;
    return ({
        url: (_a = process.env.DATABASE_URL) !== null && _a !== void 0 ? _a : '',
    });
});
