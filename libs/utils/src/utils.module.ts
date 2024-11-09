import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { RandomNameModule } from './random-name/random-name.module';

@Module({
  providers: [UtilsService],
  exports: [UtilsService],
  imports: [RandomNameModule],
})
export class UtilsModule {}
