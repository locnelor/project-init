import { NestFactory } from '@nestjs/core';
import { WormFileModule } from './worm-file.module';

async function bootstrap() {
  const app = await NestFactory.create(WormFileModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
