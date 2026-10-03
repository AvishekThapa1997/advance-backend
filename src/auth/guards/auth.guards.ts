import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { REQUIRE_AUTH } from '../constants/auth.constants.js';
import { AuthRequest } from '../types/auth.types.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredAuth = this.reflector.getAllAndOverride<boolean>(
      REQUIRE_AUTH,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredAuth) {
      return true;
    }
    const request = context.switchToHttp().getRequest<AuthRequest>();
    if (!request.session?.userId) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
