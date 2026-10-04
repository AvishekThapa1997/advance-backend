import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectUserRepository } from '../users/decorators/users.decorators.js';
import type { IUserRepository } from '../users/repository/user.repository.js';
import { PasswordService } from './providers/password-helper.provider.js';
import { SignInDto, SignUpDto } from './schema/auth.schema.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    @InjectUserRepository()
    private readonly userRespository: IUserRepository,
  ) {}

  async signUp(input: SignUpDto) {
    const existingUser = await this.userRespository.findByEmail(input.email);
    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      input.password,
    );

    const user = await this.userRespository.createUser({
      name: input.name,
      email: input.email,
      password: hashedPassword,
    });

    return user;
  }

  async signIn(input: SignInDto) {
    const user = await this.userRespository.findByEmail(
      input.email,
      /*include password*/ true,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordValid = await this.passwordService.comparePassword(
      input.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return user;
  }

  async getCurrentUser(userId: number) {
    const user = await this.userRespository.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
