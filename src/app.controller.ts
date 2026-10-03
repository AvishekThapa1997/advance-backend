import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service.js';
import { InjectRedis } from './redis/redis.decorator.js';
import type { Redis } from '@upstash/redis';

@Controller()
export class AppController {
  @InjectRedis()
  private readonly redis: Redis;
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
