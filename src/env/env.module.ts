import { Global, Module } from '@nestjs/common';
import { EnvService } from './env.service.js';
import { ConfigModule } from '@nestjs/config';
import { validateEnvironment } from './schema/env.schema.js';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnvironment,
      cache: true,
    }),
  ],
  providers: [EnvService],
})
export class EnvModule {}
