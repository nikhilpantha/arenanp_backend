"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlConfigFactory = void 0;
var apollo_1 = require("@nestjs/apollo");
var config_1 = require("@nestjs/config");
var default_1 = require("@apollo/server/plugin/landingPage/default");
var path_1 = require("path");
exports.graphqlConfigFactory = {
    driver: apollo_1.ApolloDriver,
    inject: [config_1.ConfigService],
    useFactory: function (config) {
        var _a;
        var introspection = (_a = config.get('GRAPHQL_INTROSPECTION')) !== null && _a !== void 0 ? _a : false;
        var isProd = config.get('NODE_ENV') === 'production';
        return {
            autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            introspection: introspection,
            // Disable the deprecated graphql-playground that @nestjs/apollo mounts by default.
            playground: false,
            // In dev, mount Apollo Sandbox (modern embedded explorer). In prod, no landing page.
            plugins: isProd ? [] : [(0, default_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true })],
            context: function (_a) {
                var req = _a.req, res = _a.res;
                return ({ req: req, res: res });
            },
        };
    },
};
