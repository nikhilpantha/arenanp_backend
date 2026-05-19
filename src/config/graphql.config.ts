import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';

export const graphqlConfigFactory = {
  driver: ApolloDriver,
  inject: [ConfigService],
  useFactory: (config: ConfigService): ApolloDriverConfig & GqlModuleOptions => {
    const introspection = config.get<boolean>('GRAPHQL_INTROSPECTION') ?? false;
    const isProd = config.get<string>('NODE_ENV') === 'production';

    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      introspection,
      // Disable the deprecated graphql-playground that @nestjs/apollo mounts by default.
      playground: false,
      // In dev, mount Apollo Sandbox (modern embedded explorer). In prod, no landing page.
      plugins: isProd ? [] : [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
      context: ({ req, res }: { req: unknown; res: unknown }) => ({ req, res }),
    };
  },
};
