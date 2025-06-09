import { NestFactory } from '@nestjs/core';
import { WormJobModule } from './worm-job.module';

async function bootstrap() {
  const app = await NestFactory.create(WormJobModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
