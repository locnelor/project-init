import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { SystemModule } from './system/system.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          driver: ApolloDriver,
          subscriptions: {
            'graphql-ws': {
              onConnect: (context: any) => {
                const { connectionParams, extra } = context;
                const { Authorization } = connectionParams;
                extra.Authorization = Authorization;
              },
            },
          },
          autoSchemaFile: join(process.cwd(), 'schema.gql'),
          definitions: {
            path: join(__dirname, 'types/graphql.ts'),
          },
          playground: true,

          context: ({ req, res, connection = {} as any, extra }) => {
            const raw = req || connection.context || extra.request;
            if (
              !!extra?.Authorization &&
              !!raw.headers &&
              !raw.headers.authorization
            ) {
              raw.headers.authorization = extra?.Authorization;
            }
            return {
              req: raw,
              res,
              trackErrors(errors) {
                console.log('app.module', errors);
              },
            };
          },
        };
      },
    }),
    SystemModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver
  ],
})
export class AppModule { }
