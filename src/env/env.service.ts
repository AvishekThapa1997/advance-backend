import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { EnvironmentVariables } from './schema/env.schema.js';

@Injectable()
export class EnvService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  getEnvironment<K extends keyof EnvironmentVariables>(key: K) {
    return this.configService.getOrThrow<EnvironmentVariables[K]>(key);
  }
}
