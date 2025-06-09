import { Controller, Get } from '@nestjs/common';
import { WormFileService } from './worm-file.service';

@Controller()
export class WormFileController {
  constructor(private readonly wormFileService: WormFileService) {}

  @Get()
  getHello(): string {
    return this.wormFileService.getHello();
  }
}
