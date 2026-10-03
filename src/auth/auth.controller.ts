import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { ZodValidationPipe } from '../common/pipe/zod-validation.pipe.js';
import { AuthService } from './auth.service.js';
import {
  AUTH_SESSION_COOKIE
} from './constants/auth.constants.js';
import { Auth, UserId } from './decorators/auth.decorators.js';
import { AuthGuard } from './guards/auth.guards.js';
import {
  signInSchema,
  signUpSchema,
  type SignInDto,
  type SignUpDto,
} from './schema/auth.schema.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body(new ZodValidationPipe(signUpSchema)) body: SignUpDto,
    @Req() request: Request,
  ) {
    const user = await this.authService.signUp(body);
    Logger.debug('SignUp', user);
    request.session.userId = user.id;
    return user;
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body(new ZodValidationPipe(signInSchema)) body: SignInDto,
    @Req() request: Request,
  ) {
    const user = await this.authService.signIn(body);
    request.session.userId = user.id;
    return user;
  }

  @Get('session')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @UseGuards(AuthGuard)
  async getSessionUser(@UserId() userId: number) {
    return this.authService.getCurrentUser(userId);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @UseGuards(AuthGuard)
  async signOut(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    await new Promise((res, rej) => {
      request.session.destroy((err) => {
        if (err) {
          rej(err);
        } else {
          res(null);
        }
      });
    });
    response.clearCookie(AUTH_SESSION_COOKIE, { path: '/' });
    response.clearCookie('connect.sid', { path: '/' });
    return {};
  }
}
