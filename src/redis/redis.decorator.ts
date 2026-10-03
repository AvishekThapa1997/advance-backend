import { Inject } from '@nestjs/common';
import { REDIS_CLIENT } from './redis.constants.js';

export const InjectRedis = () => Inject(REDIS_CLIENT);
