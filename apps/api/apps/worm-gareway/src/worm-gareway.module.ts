import { Module } from '@nestjs/common';
import { WormGarewayController } from './worm-gareway.controller';
import { WormGarewayService } from './worm-gareway.service';

@Module({
  imports: [],
  controllers: [WormGarewayController],
  providers: [WormGarewayService],
})
export class WormGarewayModule {}
