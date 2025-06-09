import { Module } from '@nestjs/common';
import { WormModulesController } from './worm-modules.controller';
import { WormModulesService } from './worm-modules.service';

@Module({
  imports: [],
  controllers: [WormModulesController],
  providers: [WormModulesService],
})
export class WormModulesModule {}
