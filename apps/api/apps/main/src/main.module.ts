import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { WeChatModule } from '@app/wechat';
import { FileModule, FileService } from '@app/file';
import { RedisCacheModule } from '@app/redis-cache';
import { MainController } from './main.controller';
import { MainService } from './main.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: (Joi.object({
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        REDIS_PASSWORD: Joi.string().allow('').optional(),
        PORT: Joi.number().port().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES: Joi.string().required()
      })),
      cache: true,
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
    WeChatModule.forRootAsync({
      imports: [ConfigModule, FileModule],
      inject: [ConfigService, FileService],
      useFactory: (configService: ConfigService, fileService: FileService) => ({
        appId: configService.getOrThrow('WX_APPID'),
        secret: configService.getOrThrow('WX_SECRET'),
        token: configService.getOrThrow('WX_TOKEN'),
        encodingAESKey: configService.getOrThrow('WX_AESKEY'),
        mchid: configService.getOrThrow("mchid"),
        privateKey: fileService.getPrivateKey(),
        publicKey: fileService.getPublicKey(),
        debug: true,
      }),
    }),
    RedisCacheModule,
  ],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule { }
