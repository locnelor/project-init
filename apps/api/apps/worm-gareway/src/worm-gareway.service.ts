import { Injectable } from '@nestjs/common';

@Injectable()
export class WormGarewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
