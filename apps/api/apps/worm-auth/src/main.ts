import { NestFactory } from '@nestjs/core';
import { WormAuthModule } from './worm-auth.module';

async function bootstrap() {
  const app = await NestFactory.create(WormAuthModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
