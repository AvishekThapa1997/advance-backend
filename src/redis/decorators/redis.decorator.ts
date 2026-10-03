import { Inject } from '@nestjs/common';
import { REDIS_CLIENT } from '../constants/redis.constants.js';

export const InjectRedis = () => Inject(REDIS_CLIENT);
