import { Injectable } from '@nestjs/common';

@Injectable()
export class WormGatewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
