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
exports.PageInfo = exports.PaginationInput = void 0;
exports.buildPageInfo = buildPageInfo;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
/** Reusable 1-indexed offset pagination input. */
var PaginationInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _pageSize_decorators;
    var _pageSize_initializers = [];
    var _pageSize_extraInitializers = [];
    var PaginationInput = _classThis = /** @class */ (function () {
        function PaginationInput_1() {
            this.page = __runInitializers(this, _page_initializers, 1);
            this.pageSize = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _pageSize_initializers, 20));
            __runInitializers(this, _pageSize_extraInitializers);
        }
        return PaginationInput_1;
    }());
    __setFunctionName(_classThis, "PaginationInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _page_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { defaultValue: 1, description: 'Page number, 1-indexed.' }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.IsOptional)()];
        _pageSize_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { defaultValue: 20, description: 'Page size, max 100.' }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100), (0, class_validator_1.IsOptional)()];
        __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
        __esDecorate(null, null, _pageSize_decorators, { kind: "field", name: "pageSize", static: false, private: false, access: { has: function (obj) { return "pageSize" in obj; }, get: function (obj) { return obj.pageSize; }, set: function (obj, value) { obj.pageSize = value; } }, metadata: _metadata }, _pageSize_initializers, _pageSize_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaginationInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaginationInput = _classThis;
}();
exports.PaginationInput = PaginationInput;
var PageInfo = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Pagination metadata returned alongside list payloads.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _pageSize_decorators;
    var _pageSize_initializers = [];
    var _pageSize_extraInitializers = [];
    var _totalItems_decorators;
    var _totalItems_initializers = [];
    var _totalItems_extraInitializers = [];
    var _totalPages_decorators;
    var _totalPages_initializers = [];
    var _totalPages_extraInitializers = [];
    var _hasNextPage_decorators;
    var _hasNextPage_initializers = [];
    var _hasNextPage_extraInitializers = [];
    var _hasPreviousPage_decorators;
    var _hasPreviousPage_initializers = [];
    var _hasPreviousPage_extraInitializers = [];
    var PageInfo = _classThis = /** @class */ (function () {
        function PageInfo_1() {
            this.page = __runInitializers(this, _page_initializers, void 0);
            this.pageSize = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _pageSize_initializers, void 0));
            this.totalItems = (__runInitializers(this, _pageSize_extraInitializers), __runInitializers(this, _totalItems_initializers, void 0));
            this.totalPages = (__runInitializers(this, _totalItems_extraInitializers), __runInitializers(this, _totalPages_initializers, void 0));
            this.hasNextPage = (__runInitializers(this, _totalPages_extraInitializers), __runInitializers(this, _hasNextPage_initializers, void 0));
            this.hasPreviousPage = (__runInitializers(this, _hasNextPage_extraInitializers), __runInitializers(this, _hasPreviousPage_initializers, void 0));
            __runInitializers(this, _hasPreviousPage_extraInitializers);
        }
        return PageInfo_1;
    }());
    __setFunctionName(_classThis, "PageInfo");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _page_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _pageSize_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _totalItems_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _totalPages_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _hasNextPage_decorators = [(0, graphql_1.Field)()];
        _hasPreviousPage_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
        __esDecorate(null, null, _pageSize_decorators, { kind: "field", name: "pageSize", static: false, private: false, access: { has: function (obj) { return "pageSize" in obj; }, get: function (obj) { return obj.pageSize; }, set: function (obj, value) { obj.pageSize = value; } }, metadata: _metadata }, _pageSize_initializers, _pageSize_extraInitializers);
        __esDecorate(null, null, _totalItems_decorators, { kind: "field", name: "totalItems", static: false, private: false, access: { has: function (obj) { return "totalItems" in obj; }, get: function (obj) { return obj.totalItems; }, set: function (obj, value) { obj.totalItems = value; } }, metadata: _metadata }, _totalItems_initializers, _totalItems_extraInitializers);
        __esDecorate(null, null, _totalPages_decorators, { kind: "field", name: "totalPages", static: false, private: false, access: { has: function (obj) { return "totalPages" in obj; }, get: function (obj) { return obj.totalPages; }, set: function (obj, value) { obj.totalPages = value; } }, metadata: _metadata }, _totalPages_initializers, _totalPages_extraInitializers);
        __esDecorate(null, null, _hasNextPage_decorators, { kind: "field", name: "hasNextPage", static: false, private: false, access: { has: function (obj) { return "hasNextPage" in obj; }, get: function (obj) { return obj.hasNextPage; }, set: function (obj, value) { obj.hasNextPage = value; } }, metadata: _metadata }, _hasNextPage_initializers, _hasNextPage_extraInitializers);
        __esDecorate(null, null, _hasPreviousPage_decorators, { kind: "field", name: "hasPreviousPage", static: false, private: false, access: { has: function (obj) { return "hasPreviousPage" in obj; }, get: function (obj) { return obj.hasPreviousPage; }, set: function (obj, value) { obj.hasPreviousPage = value; } }, metadata: _metadata }, _hasPreviousPage_initializers, _hasPreviousPage_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PageInfo = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PageInfo = _classThis;
}();
exports.PageInfo = PageInfo;
function buildPageInfo(page, pageSize, totalItems) {
    var totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / pageSize);
    return {
        page: page,
        pageSize: pageSize,
        totalItems: totalItems,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
    };
}
