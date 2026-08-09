"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowWhilePasswordPending = exports.ALLOW_PASSWORD_PENDING_KEY = void 0;
var common_1 = require("@nestjs/common");
exports.ALLOW_PASSWORD_PENDING_KEY = 'allowPasswordPending';
/**
 * Let this handler run even though the caller still owes us a password change.
 *
 * Exactly two things need it: reading `me` (the client has to know who it is
 * to render the "choose a password" screen) and the mutation that changes the
 * password. Anything else would be a hole in the wall.
 */
var AllowWhilePasswordPending = function () { return (0, common_1.SetMetadata)(exports.ALLOW_PASSWORD_PENDING_KEY, true); };
exports.AllowWhilePasswordPending = AllowWhilePasswordPending;
