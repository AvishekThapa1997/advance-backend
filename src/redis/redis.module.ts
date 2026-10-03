import { Global, Module } from '@nestjs/common';
import { REDIS_CLIENT } from './constants/redis.constants.js';
import { EnvService } from '../env/env.service.js';
import { Redis } from '@upstash/redis';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: (envService: EnvService) => {
        const redisUrl = envService.getEnvironment('REDIS_URL');
        const redisToken = envService.getEnvironment('REDIS_TOKEN');
        const redis = new Redis({
          url: redisUrl,
          token: redisToken,
        });
        return redis;
      },

      inject: [EnvService],
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
