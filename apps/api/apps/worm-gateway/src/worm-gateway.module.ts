import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { WormGatewayController } from './worm-gateway.controller';
import { WormGatewayService } from './worm-gateway.service';
import { ProxyModule } from './proxy/proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HttpModule,
    ProxyModule,
  ],
  controllers: [WormGatewayController],
  providers: [WormGatewayService],
})
export class WormGatewayModule { }
