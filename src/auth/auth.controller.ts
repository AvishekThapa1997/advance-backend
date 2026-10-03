import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import {
  AUTH_SESSION_COOKIE,
  AUTH_SESSION_TTL_SECONDS,
} from './constants/auth.constants.js';
import type { SignInDto, SignUpDto } from './schema/auth.schema.js';
import { Public } from './decorators/auth.decorators.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() body: SignUpDto, @Res() request: Request) {
    const user = await this.authService.signUp(body);
    request.session.userId = user.id;
    return user;
  }

  @Post('signin')
  @Public()
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: SignInDto, @Req() request: Request) {
    const user = await this.authService.signIn(body);
    request.session.userId = user.id;
    return user;
  }

  @Post('signout')
  async signOut(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    // const sessionId = this.getSessionId(request);

    // if (sessionId) {
    //   //await this.authService.signOut(sessionId);
    // }

    response.clearCookie(AUTH_SESSION_COOKIE);

    return {
      success: true,
    };
  }
}
