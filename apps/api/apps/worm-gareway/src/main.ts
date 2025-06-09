import { NestFactory } from '@nestjs/core';
import { WormGarewayModule } from './worm-gareway.module';

async function bootstrap() {
  const app = await NestFactory.create(WormGarewayModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
