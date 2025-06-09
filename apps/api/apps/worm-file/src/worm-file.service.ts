import { Injectable } from '@nestjs/common';

@Injectable()
export class WormFileService {
  getHello(): string {
    return 'Hello World!';
  }
}
