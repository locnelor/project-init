import { Injectable } from '@nestjs/common';

@Injectable()
export class WormModulesService {
  getHello(): string {
    return 'Hello World!';
  }
}
