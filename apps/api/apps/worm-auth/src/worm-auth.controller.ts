import { Controller, Get } from '@nestjs/common';
import { WormAuthService } from './worm-auth.service';

@Controller()
export class WormAuthController {
  constructor(private readonly wormAuthService: WormAuthService) {}

  @Get()
  getHello(): string {
    return this.wormAuthService.getHello();
  }
}
