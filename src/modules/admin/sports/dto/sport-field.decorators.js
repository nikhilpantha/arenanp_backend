"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagListField = TagListField;
exports.BoundedIntField = BoundedIntField;
exports.LabelField = LabelField;
exports.SlotDurationsField = SlotDurationsField;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
/** A catalogue of short labels — surfaces, formats, court features, presets. */
function TagListField(description, _a) {
    var create = _a.create;
    return (0, common_1.applyDecorators)((0, graphql_1.Field)(function () { return [String]; }, create ? { defaultValue: [], description: description } : { nullable: true, description: description }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.MaxLength)(60, { each: true }), (0, class_validator_1.ArrayMaxSize)(40));
}
/** An optional bounded whole number — a duration, a capacity, a day count. */
function BoundedIntField(description, bounds) {
    return (0, common_1.applyDecorators)((0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true, description: description }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(bounds.min), (0, class_validator_1.Max)(bounds.max));
}
/** A short human label such as the bookable-unit noun ("court", "lane"). */
function LabelField(description, fallback, _a) {
    var create = _a.create;
    return (0, common_1.applyDecorators)((0, graphql_1.Field)(create ? { defaultValue: fallback, description: description } : { nullable: true, description: description }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(24));
}
/** Allowed slot lengths. At least one — an empty list makes a sport unsellable. */
function SlotDurationsField(_a) {
    var create = _a.create;
    var description = 'Allowed booking slot lengths (minutes), e.g. [30, 60, 90, 120].';
    return (0, common_1.applyDecorators)((0, graphql_1.Field)(function () { return [graphql_1.Int]; }, create ? { defaultValue: [30, 60, 90, 120], description: description } : { nullable: true, description: description }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.ArrayMinSize)(1), (0, class_validator_1.IsInt)({ each: true }), (0, class_validator_1.Min)(5, { each: true }), (0, class_validator_1.Max)(600, { each: true }), (0, class_validator_1.ArrayMaxSize)(12));
}
