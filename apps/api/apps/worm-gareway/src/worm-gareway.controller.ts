import { Controller, Get } from '@nestjs/common';
import { WormGarewayService } from './worm-gareway.service';

@Controller()
export class WormGarewayController {
  constructor(private readonly wormGarewayService: WormGarewayService) {}

  @Get()
  getHello(): string {
    return this.wormGarewayService.getHello();
  }
}
