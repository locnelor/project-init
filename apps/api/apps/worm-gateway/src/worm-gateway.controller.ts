import { Controller, Get } from '@nestjs/common';
import { WormGatewayService } from './worm-gateway.service';

@Controller()
export class WormGatewayController {
  constructor(private readonly wormGatewayService: WormGatewayService) {}

  @Get()
  getHello(): string {
    return this.wormGatewayService.getHello();
  }
}
