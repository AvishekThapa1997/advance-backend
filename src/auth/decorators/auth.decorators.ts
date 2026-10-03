import {
  createParamDecorator,
  ExecutionContext,
  Inject,
  SetMetadata,
} from '@nestjs/common';
import { AuthRequest } from '../types/auth.types.js';
import { REQUIRE_AUTH } from '../constants/auth.constants.js';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    const userId = request.session.userId;
    return userId;
  },
);

export const Auth = (requireAuth: boolean = true) => {
  return SetMetadata(REQUIRE_AUTH, requireAuth);
};

export const Public = () => {
  return Auth(false);
};
