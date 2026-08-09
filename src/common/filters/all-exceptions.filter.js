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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var graphql_2 = require("graphql");
var AllExceptionsFilter = function () {
    var _classDecorators = [(0, common_1.Catch)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AllExceptionsFilter = _classThis = /** @class */ (function () {
        function AllExceptionsFilter_1() {
            this.logger = new common_1.Logger(AllExceptionsFilter.name);
        }
        AllExceptionsFilter_1.prototype.setHttpAdapterHost = function (host) {
            this.httpAdapterHost = host;
        };
        AllExceptionsFilter_1.prototype.catch = function (exception, host) {
            var contextType = host.getType();
            if (contextType === 'graphql') {
                return this.handleGraphQL(exception, host);
            }
            return this.handleHttp(exception, host);
        };
        AllExceptionsFilter_1.prototype.handleGraphQL = function (exception, host) {
            var _a;
            var gqlHost = graphql_1.GqlArgumentsHost.create(host);
            var info = gqlHost.getInfo();
            var _b = this.normalise(exception), status = _b.status, message = _b.message, code = _b.code;
            this.logger.warn("[GraphQL] ".concat((_a = info === null || info === void 0 ? void 0 : info.parentType) === null || _a === void 0 ? void 0 : _a.name, ".").concat(info === null || info === void 0 ? void 0 : info.fieldName, " \u2192 ").concat(code, " (").concat(status, ") ").concat(message));
            return new graphql_2.GraphQLError(message, {
                extensions: { code: code, status: status },
            });
        };
        AllExceptionsFilter_1.prototype.handleHttp = function (exception, host) {
            var ctx = host.switchToHttp();
            var res = ctx.getResponse();
            var req = ctx.getRequest();
            var _a = this.normalise(exception), status = _a.status, message = _a.message, code = _a.code;
            this.logger.warn("[HTTP] ".concat(req.method, " ").concat(req.url, " \u2192 ").concat(status, " ").concat(code, " ").concat(message));
            res.status(status).json({
                statusCode: status,
                code: code,
                message: message,
                path: req.url,
                timestamp: new Date().toISOString(),
            });
        };
        AllExceptionsFilter_1.prototype.normalise = function (exception) {
            var _a;
            if (exception instanceof common_1.HttpException) {
                var response = exception.getResponse();
                var message = typeof response === 'string'
                    ? response
                    : response.message
                        ? Array.isArray(response.message)
                            ? response.message.join('; ')
                            : response.message
                        : exception.message;
                return {
                    status: exception.getStatus(),
                    message: message,
                    code: this.codeFromStatus(exception.getStatus()),
                };
            }
            if (exception instanceof Error) {
                this.logger.error((_a = exception.stack) !== null && _a !== void 0 ? _a : exception.message);
                return {
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Internal server error',
                    code: 'INTERNAL_SERVER_ERROR',
                };
            }
            return {
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Unknown error',
                code: 'INTERNAL_SERVER_ERROR',
            };
        };
        AllExceptionsFilter_1.prototype.codeFromStatus = function (status) {
            switch (status) {
                case 400:
                    return 'BAD_REQUEST';
                case 401:
                    return 'UNAUTHENTICATED';
                case 403:
                    return 'FORBIDDEN';
                case 404:
                    return 'NOT_FOUND';
                case 409:
                    return 'CONFLICT';
                case 422:
                    return 'UNPROCESSABLE';
                case 429:
                    return 'RATE_LIMITED';
                default:
                    return status >= 500 ? 'INTERNAL_SERVER_ERROR' : 'ERROR';
            }
        };
        return AllExceptionsFilter_1;
    }());
    __setFunctionName(_classThis, "AllExceptionsFilter");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AllExceptionsFilter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AllExceptionsFilter = _classThis;
}();
exports.AllExceptionsFilter = AllExceptionsFilter;
