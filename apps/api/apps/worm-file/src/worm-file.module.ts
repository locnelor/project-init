import { Module } from '@nestjs/common';
import { WormFileController } from './worm-file.controller';
import { WormFileService } from './worm-file.service';

@Module({
  imports: [],
  controllers: [WormFileController],
  providers: [WormFileService],
})
export class WormFileModule {}
