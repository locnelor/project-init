import { Module } from '@nestjs/common';
import { WormCommonController } from './worm-common.controller';
import { WormCommonService } from './worm-common.service';

@Module({
  imports: [],
  controllers: [WormCommonController],
  providers: [WormCommonService],
})
export class WormCommonModule {}
