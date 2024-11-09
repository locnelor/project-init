import { Module } from '@nestjs/common';
import { RandomNameService } from './random-name.service';

@Module({
  providers: [RandomNameService]
})
export class RandomNameModule {}
