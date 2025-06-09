import { Controller, Get } from '@nestjs/common';
import { WormCommonService } from './worm-common.service';

@Controller()
export class WormCommonController {
  constructor(private readonly wormCommonService: WormCommonService) {}

  @Get()
  getHello(): string {
    return this.wormCommonService.getHello();
  }
}
