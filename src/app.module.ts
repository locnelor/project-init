import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { RedisCacheModule } from '@app/redis-cache';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        REDIS_HOST: Joi.string(),
        REDIS_PORT: Joi.number(),
        REDIS_PASSWORD: Joi.string().empty(""),
        PORT: Joi.number().port(),
        JWT_SECRET: Joi.string(),
        JWT_EXPIRES: Joi.any(),
        WEBSITE_RANDOM_HOME: Joi.number()
      }),
      cache: true
    }),
    RedisCacheModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
