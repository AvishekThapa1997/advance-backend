import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DbService } from '../db/db.service.js';
import { SignInDto, SignUpDto } from './schema/auth.schema.js';
import { PasswordService } from './providers/password-helper.provider.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DbService,
    private readonly passwordService: PasswordService,
  ) {}

  async signUp(input: SignUpDto) {
    const existingUser = await this.db.user.findUnique({
      where: {
        email: input.email,
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      input.password,
    );

    const user = await this.db.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async signIn(input: SignInDto) {
    const user = await this.db.user.findUnique({
      where: {
        email: input.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordValid = this.passwordService.comparePassword(
      input.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }
}
