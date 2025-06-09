import { Controller, Get } from '@nestjs/common';
import { WormModulesService } from './worm-modules.service';

@Controller()
export class WormModulesController {
  constructor(private readonly wormModulesService: WormModulesService) {}

  @Get()
  getHello(): string {
    return this.wormModulesService.getHello();
  }
}
