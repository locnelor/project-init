import { NestFactory } from '@nestjs/core';
import { WormModulesModule } from './worm-modules.module';

async function bootstrap() {
  const app = await NestFactory.create(WormModulesModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
