"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.CustomerInsightsRepository = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var nepal_time_1 = require("../../common/utils/nepal-time");
/**
 * The aggregate half of the customer profile: four grouped scans over one
 * customer's bookings, answering "how loyal" and "how do they like to play".
 *
 * Raw SQL rather than Prisma groupBy because the interesting cuts are derived
 * — weekday and hour of the *Nepal* wall clock, calendar months, several
 * differently-filtered tallies in one pass. Everything is cast in SQL
 * (`::int` / `::float8`) so nothing comes back as a Decimal needing a second
 * conversion, and every scan is served by the `bookings(customerId)` index.
 */
/** Nepal is a fixed UTC+05:45, so wall-clock cuts are a constant shift. */
var OFFSET = client_1.Prisma.raw("interval '".concat(nepal_time_1.NEPAL_UTC_OFFSET_MINUTES, " minutes'"));
var NEPAL = client_1.Prisma.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["(b.\"startAt\" + ", ")"], ["(b.\"startAt\" + ", ")"])), OFFSET);
var NOW = client_1.Prisma.sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["(now() AT TIME ZONE 'UTC')"], ["(now() AT TIME ZONE 'UTC')"])));
/** A game that actually happened: already started, not cancelled, not a no-show. */
var VISITED = client_1.Prisma.sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["b.\"status\"::text NOT IN ('CANCELLED', 'NO_SHOW') AND b.\"startAt\" <= ", ""], ["b.\"status\"::text NOT IN ('CANCELLED', 'NO_SHOW') AND b.\"startAt\" <= ", ""])), NOW);
/** Trade: a cancelled booking is not money, even if something was collected. */
var TRADED = client_1.Prisma.sql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["b.\"status\"::text <> 'CANCELLED'"], ["b.\"status\"::text <> 'CANCELLED'"])));
var CustomerInsightsRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CustomerInsightsRepository = _classThis = /** @class */ (function () {
        function CustomerInsightsRepository_1(prisma) {
            this.prisma = prisma;
        }
        CustomerInsightsRepository_1.prototype.scope = function (venueId, customerId) {
            return client_1.Prisma.sql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["b.\"venueId\" = ", " AND b.\"customerId\" = ", ""], ["b.\"venueId\" = ", " AND b.\"customerId\" = ", ""])), venueId, customerId);
        };
        /** Every headline number in one pass, each tally with its own FILTER. */
        CustomerInsightsRepository_1.prototype.totals = function (venueId, customerId) {
            return __awaiter(this, void 0, void 0, function () {
                var row;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.$queryRaw(client_1.Prisma.sql(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      SELECT\n        COUNT(*)::int AS \"totalBookings\",\n        COUNT(*) FILTER (WHERE ", ")::int AS \"visits\",\n        COUNT(*) FILTER (WHERE b.\"status\"::text = 'COMPLETED')::int AS \"completed\",\n        COUNT(*) FILTER (WHERE b.\"status\"::text = 'CANCELLED')::int AS \"cancelled\",\n        COUNT(*) FILTER (WHERE b.\"status\"::text = 'NO_SHOW')::int AS \"noShow\",\n        COUNT(*) FILTER (\n          WHERE b.\"status\"::text NOT IN ('CANCELLED', 'NO_SHOW') AND b.\"startAt\" > ", "\n        )::int AS \"upcoming\",\n        COUNT(*) FILTER (WHERE b.\"freeGame\" AND ", ")::int AS \"freeGames\",\n        COUNT(*) FILTER (WHERE b.\"source\"::text = 'WALK_IN' AND ", ")::int AS \"walkInBookings\",\n        COUNT(*) FILTER (WHERE b.\"source\"::text = 'ONLINE' AND ", ")::int AS \"onlineBookings\",\n        COUNT(*) FILTER (\n          WHERE b.\"source\"::text = 'SUBSCRIPTION' AND ", "\n        )::int AS \"membershipBookings\",\n        COALESCE(SUM(b.\"durationMinutes\") FILTER (WHERE ", "), 0)::int AS \"playedMinutes\",\n        COALESCE(SUM(b.\"total\") FILTER (WHERE ", "), 0)::float8 AS \"billed\",\n        COALESCE(SUM(b.\"amountPaid\") FILTER (WHERE ", "), 0)::float8 AS \"paid\",\n        COALESCE(SUM(b.\"discountAmount\") FILTER (WHERE ", "), 0)::float8 AS \"discount\",\n        MIN(b.\"startAt\") FILTER (WHERE ", ") AS \"firstVisitAt\",\n        MAX(b.\"startAt\") FILTER (WHERE ", ") AS \"lastVisitAt\",\n        MIN(b.\"startAt\") FILTER (\n          WHERE b.\"status\"::text NOT IN ('CANCELLED', 'NO_SHOW') AND b.\"startAt\" > ", "\n        ) AS \"nextVisitAt\"\n      FROM \"bookings\" b\n      WHERE ", "\n    "], ["\n      SELECT\n        COUNT(*)::int AS \"totalBookings\",\n        COUNT(*) FILTER (WHERE ", ")::int AS \"visits\",\n        COUNT(*) FILTER (WHERE b.\"status\"::text = 'COMPLETED')::int AS \"completed\",\n        COUNT(*) FILTER (WHERE b.\"status\"::text = 'CANCELLED')::int AS \"cancelled\",\n        COUNT(*) FILTER (WHERE b.\"status\"::text = 'NO_SHOW')::int AS \"noShow\",\n        COUNT(*) FILTER (\n          WHERE b.\"status\"::text NOT IN ('CANCELLED', 'NO_SHOW') AND b.\"startAt\" > ", "\n        )::int AS \"upcoming\",\n        COUNT(*) FILTER (WHERE b.\"freeGame\" AND ", ")::int AS \"freeGames\",\n        COUNT(*) FILTER (WHERE b.\"source\"::text = 'WALK_IN' AND ", ")::int AS \"walkInBookings\",\n        COUNT(*) FILTER (WHERE b.\"source\"::text = 'ONLINE' AND ", ")::int AS \"onlineBookings\",\n        COUNT(*) FILTER (\n          WHERE b.\"source\"::text = 'SUBSCRIPTION' AND ", "\n        )::int AS \"membershipBookings\",\n        COALESCE(SUM(b.\"durationMinutes\") FILTER (WHERE ", "), 0)::int AS \"playedMinutes\",\n        COALESCE(SUM(b.\"total\") FILTER (WHERE ", "), 0)::float8 AS \"billed\",\n        COALESCE(SUM(b.\"amountPaid\") FILTER (WHERE ", "), 0)::float8 AS \"paid\",\n        COALESCE(SUM(b.\"discountAmount\") FILTER (WHERE ", "), 0)::float8 AS \"discount\",\n        MIN(b.\"startAt\") FILTER (WHERE ", ") AS \"firstVisitAt\",\n        MAX(b.\"startAt\") FILTER (WHERE ", ") AS \"lastVisitAt\",\n        MIN(b.\"startAt\") FILTER (\n          WHERE b.\"status\"::text NOT IN ('CANCELLED', 'NO_SHOW') AND b.\"startAt\" > ", "\n        ) AS \"nextVisitAt\"\n      FROM \"bookings\" b\n      WHERE ", "\n    "])), VISITED, NOW, TRADED, TRADED, TRADED, TRADED, VISITED, TRADED, TRADED, TRADED, VISITED, VISITED, NOW, this.scope(venueId, customerId)))];
                        case 1:
                            row = (_a.sent())[0];
                            return [2 /*return*/, row];
                    }
                });
            });
        };
        /** Visits per court (with its sport), busiest first — the "favourite court" cut. */
        CustomerInsightsRepository_1.prototype.courtPlay = function (venueId, customerId) {
            return this.prisma.$queryRaw(client_1.Prisma.sql(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n      SELECT c.\"name\" AS \"courtName\", s.\"name\" AS \"sportName\", COUNT(*)::int AS games\n      FROM \"bookings\" b\n      JOIN \"courts\" c ON c.\"id\" = b.\"courtId\"\n      JOIN \"sports\" s ON s.\"id\" = c.\"sportId\"\n      WHERE ", " AND ", "\n      GROUP BY c.\"name\", s.\"name\"\n      ORDER BY games DESC, c.\"name\" ASC\n    "], ["\n      SELECT c.\"name\" AS \"courtName\", s.\"name\" AS \"sportName\", COUNT(*)::int AS games\n      FROM \"bookings\" b\n      JOIN \"courts\" c ON c.\"id\" = b.\"courtId\"\n      JOIN \"sports\" s ON s.\"id\" = c.\"sportId\"\n      WHERE ", " AND ", "\n      GROUP BY c.\"name\", s.\"name\"\n      ORDER BY games DESC, c.\"name\" ASC\n    "])), this.scope(venueId, customerId), VISITED));
        };
        /** Visits by Nepal weekday (0 = Sunday) and start hour — the "when do they play" cut. */
        CustomerInsightsRepository_1.prototype.slotPlay = function (venueId, customerId) {
            return this.prisma.$queryRaw(client_1.Prisma.sql(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n      SELECT\n        EXTRACT(DOW FROM ", ")::int AS weekday,\n        EXTRACT(HOUR FROM ", ")::int AS hour,\n        COUNT(*)::int AS games\n      FROM \"bookings\" b\n      WHERE ", " AND ", "\n      GROUP BY 1, 2\n    "], ["\n      SELECT\n        EXTRACT(DOW FROM ", ")::int AS weekday,\n        EXTRACT(HOUR FROM ", ")::int AS hour,\n        COUNT(*)::int AS games\n      FROM \"bookings\" b\n      WHERE ", " AND ", "\n      GROUP BY 1, 2\n    "])), NEPAL, NEPAL, this.scope(venueId, customerId), VISITED));
        };
        /** Visits and collected spend per Nepal calendar month, over the last 12 months. */
        CustomerInsightsRepository_1.prototype.monthlyPlay = function (venueId, customerId) {
            return this.prisma.$queryRaw(client_1.Prisma.sql(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n      SELECT\n        to_char(date_trunc('month', ", "), 'YYYY-MM') AS month,\n        COUNT(*)::int AS games,\n        COALESCE(SUM(b.\"amountPaid\"), 0)::float8 AS spend\n      FROM \"bookings\" b\n      WHERE ", "\n        AND ", "\n        AND ", " >= date_trunc('month', ", " + ", ") - interval '11 months'\n      GROUP BY 1\n      ORDER BY 1 ASC\n    "], ["\n      SELECT\n        to_char(date_trunc('month', ", "), 'YYYY-MM') AS month,\n        COUNT(*)::int AS games,\n        COALESCE(SUM(b.\"amountPaid\"), 0)::float8 AS spend\n      FROM \"bookings\" b\n      WHERE ", "\n        AND ", "\n        AND ", " >= date_trunc('month', ", " + ", ") - interval '11 months'\n      GROUP BY 1\n      ORDER BY 1 ASC\n    "])), NEPAL, this.scope(venueId, customerId), VISITED, NEPAL, NOW, OFFSET));
        };
        return CustomerInsightsRepository_1;
    }());
    __setFunctionName(_classThis, "CustomerInsightsRepository");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CustomerInsightsRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CustomerInsightsRepository = _classThis;
}();
exports.CustomerInsightsRepository = CustomerInsightsRepository;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
