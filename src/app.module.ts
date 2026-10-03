import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EnvModule } from './env/env.module.js';
import { DbModule } from './db/db.module.js';
import { RedisModule } from './redis/redis.module.js';

@Module({
  imports: [EnvModule, DbModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
