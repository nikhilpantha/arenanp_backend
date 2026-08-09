"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = exports.IS_PUBLIC_KEY = void 0;
var common_1 = require("@nestjs/common");
exports.IS_PUBLIC_KEY = 'isPublic';
/**
 * Mark a controller / resolver / handler as accessible without a JWT.
 * Used by `JwtAuthGuard` and `GqlAuthGuard` to short-circuit auth.
 */
var Public = function () { return (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true); };
exports.Public = Public;
