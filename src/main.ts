import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { EnvService } from './env/env.service.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(EnvService);
  const port = env.getEnvironment('PORT');
  await app.listen(port ?? 3000);
}
await bootstrap();
