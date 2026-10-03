import { Inject, Injectable } from '@nestjs/common';
import { EnvService } from '../../env/env.service.js';
import bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  constructor(@Inject() private readonly envService: EnvService) {}

  async hashPassword(plainPassword: string) {
    return bcrypt.hash(
      plainPassword,
      this.envService.getEnvironment('BCRYPT_ROUNDS'),
    );
  }
  async comparePassword(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
