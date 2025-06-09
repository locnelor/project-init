import { Injectable } from '@nestjs/common';

@Injectable()
export class WormSystemService {
  getHello(): string {
    return 'Hello World!';
  }
}
