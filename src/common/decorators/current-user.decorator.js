"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
/**
 * Inject the authenticated user (populated by JwtStrategy / GqlAuthGuard).
 * Works in both REST and GraphQL handlers.
 */
exports.CurrentUser = (0, common_1.createParamDecorator)(function (_, context) {
    var _a;
    if (context.getType() === 'graphql') {
        var ctx = graphql_1.GqlExecutionContext.create(context);
        return (_a = ctx.getContext().req) === null || _a === void 0 ? void 0 : _a.user;
    }
    return context.switchToHttp().getRequest().user;
});
