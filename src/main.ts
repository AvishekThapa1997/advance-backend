import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import { AppModule } from './app.module.js';
import { SESSION_STORE } from './auth/constants/auth.constants.js';
import { EnvService } from './env/env.service.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(EnvService);
  const sessionStore = app.get(SESSION_STORE);
  app.enableShutdownHooks();
  app.setGlobalPrefix('/api');

  app.use(
    session({
      store: sessionStore,
      secret: env.getEnvironment('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: env.getEnvironment('NODE_ENV') === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    }),
  );
  const port = env.getEnvironment('PORT');
  await app.listen(port ?? 3000);
}
await bootstrap();
