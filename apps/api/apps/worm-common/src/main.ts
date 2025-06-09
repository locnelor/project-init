import { NestFactory } from '@nestjs/core';
import { WormCommonModule } from './worm-common.module';

async function bootstrap() {
  const app = await NestFactory.create(WormCommonModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
