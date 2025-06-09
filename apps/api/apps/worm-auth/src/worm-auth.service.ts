import { Injectable } from '@nestjs/common';

@Injectable()
export class WormAuthService {
  getHello(): string {
    return 'Hello World!';
  }
}
