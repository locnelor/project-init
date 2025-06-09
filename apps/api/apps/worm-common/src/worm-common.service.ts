import { Injectable } from '@nestjs/common';

@Injectable()
export class WormCommonService {
  getHello(): string {
    return 'Hello World!';
  }
}
