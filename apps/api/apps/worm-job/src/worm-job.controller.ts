import { Controller, Get } from '@nestjs/common';
import { WormJobService } from './worm-job.service';

@Controller()
export class WormJobController {
  constructor(private readonly wormJobService: WormJobService) {}

  @Get()
  getHello(): string {
    return this.wormJobService.getHello();
  }
}
