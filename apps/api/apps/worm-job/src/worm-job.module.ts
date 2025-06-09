import { Module } from '@nestjs/common';
import { WormJobController } from './worm-job.controller';
import { WormJobService } from './worm-job.service';

@Module({
  imports: [],
  controllers: [WormJobController],
  providers: [WormJobService],
})
export class WormJobModule {}
