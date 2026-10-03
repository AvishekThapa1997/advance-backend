import { Injectable } from '@nestjs/common';
import { Redis } from '@upstash/redis';

import { type SessionData, Store } from 'express-session';
import { InjectRedis } from '../../redis/decorators/redis.decorator.js';
import {
  AUTH_SESSION_PREFIX,
  AUTH_SESSION_TTL_SECONDS,
} from '../constants/auth.constants.js';

@Injectable()
export class SessionStoreService extends Store {
  constructor(@InjectRedis() private readonly redis: Redis) {
    super();
  }

  private createSessionId(sid: string) {
    return `${AUTH_SESSION_PREFIX}${sid}`;
  }

  get(
    sid: string,
    callback: (err: any, session?: SessionData | null) => void,
  ): void {
    this.redis
      .get<SessionData>(this.createSessionId(sid))
      .then((data) => callback(null, data ?? null))
      .catch((err) => callback(err));
  }

  set(
    sid: string,
    sessionData: SessionData,
    callback?: (err?: any) => void,
  ): void {
    try {
      const ttlSeconds = AUTH_SESSION_TTL_SECONDS;

      this.redis
        .set(this.createSessionId(sid), sessionData, { ex: ttlSeconds })
        .then(() => callback?.(null))
        .catch((err) => callback?.(err));
    } catch (err) {
      callback?.(err);
    }
  }

  destroy(sid: string, callback?: (err?: any) => void): void {
    this.redis
      .del(this.createSessionId(sid))
      .then(() => callback?.(null))
      .catch((err) => callback?.(err));
  }

  touch(sid: string, sessionData: SessionData, callback?: () => void): void {
    const maxAge = sessionData?.cookie?.maxAge;
    if (typeof maxAge === 'number' && maxAge > 0) {
      const ttlSeconds = Math.ceil(maxAge / 1000);
      this.redis
        .expire(this.createSessionId(sid), ttlSeconds)
        .then(() => callback?.())
        .catch(() => callback?.());
    } else {
      callback?.();
    }
  }
}
