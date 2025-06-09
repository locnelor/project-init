import { Injectable } from '@nestjs/common';

@Injectable()
export class WormJobService {
  getHello(): string {
    return 'Hello World!';
  }
}
