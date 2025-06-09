import { Controller, Get } from '@nestjs/common';
import { WormSystemService } from './worm-system.service';

@Controller()
export class WormSystemController {
  constructor(private readonly wormSystemService: WormSystemService) {}

  @Get("hello")
  getHello(): string {
    return this.wormSystemService.getHello();
  }
}
