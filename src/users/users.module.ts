import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from './constants/users.constants.js';
import { UserRepositoryImpl } from './repository/user.repository.js';

@Module({
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UsersModule {}
