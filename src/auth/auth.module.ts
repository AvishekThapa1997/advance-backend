import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { PasswordService } from './providers/password-helper.provider.js';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guards.js';
import { SESSION_STORE } from './constants/auth.constants.js';
import { SessionStoreService } from './providers/session-store.provider.js';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    {
      provide: SESSION_STORE,
      useClass: SessionStoreService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [SESSION_STORE],
})
export class AuthModule {}
