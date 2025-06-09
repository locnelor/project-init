import { Module } from '@nestjs/common';
import { WormAuthController } from './worm-auth.controller';
import { WormAuthService } from './worm-auth.service';

@Module({
  imports: [],
  controllers: [WormAuthController],
  providers: [WormAuthService],
})
export class WormAuthModule {}
