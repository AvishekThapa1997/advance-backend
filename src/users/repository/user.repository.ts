import { Injectable } from '@nestjs/common';

import { DbService } from '../../db/db.service.js';

import { Prisma } from '@prisma/client';
import { userSelect, userSelectWithPassword } from '../helper/query.js';
import type {
  CreateUserInput,
  UserDto,
  UserDtoWithPassword,
} from '../types/users.types.js';

export interface IUserRepository {
  findById(
    userId: UserDto['id'],
    includePassword: true,
  ): Promise<UserDtoWithPassword | null>;
  findById(
    userId: UserDto['id'],
    includePassword?: false,
  ): Promise<UserDto | null>;
  findById(
    userId: UserDto['id'],
    includePassword?: boolean,
  ): Promise<UserDto | UserDtoWithPassword | null>;

  findByEmail(
    email: UserDto['email'],
    includePassword: true,
  ): Promise<UserDtoWithPassword | null>;
  findByEmail(
    email: UserDto['email'],
    includePassword?: false,
  ): Promise<UserDto | null>;
  findByEmail(
    email: UserDto['email'],
    includePassword?: boolean,
  ): Promise<UserDto | UserDtoWithPassword | null>;

  createUser(data: CreateUserInput): Promise<UserDto>;
}

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(private readonly db: DbService) {}

  private fetchUser(
    args: Prisma.UserWhereUniqueInput,
    select?: Prisma.UserSelect,
  ) {
    return this.db.user.findUnique({
      where: args,
      select,
    });
  }

  findById(
    userId: UserDto['id'],
    includePassword: true,
  ): Promise<UserDtoWithPassword | null>;
  findById(
    userId: UserDto['id'],
    includePassword?: false,
  ): Promise<UserDto | null>;
  findById(
    userId: UserDto['id'],
    includePassword?: boolean,
  ): Promise<UserDto | UserDtoWithPassword | null>;
  async findById(
    userId: UserDto['id'],
    includePassword = false,
  ): Promise<UserDto | UserDtoWithPassword | null> {
    const where: Prisma.UserWhereUniqueInput = {
      id: userId,
    };
    if (includePassword) {
      return this.fetchUser(where, userSelectWithPassword);
    }
    return this.fetchUser(where, userSelect);
  }

  findByEmail(
    email: UserDto['email'],
    includePassword: true,
  ): Promise<UserDtoWithPassword | null>;
  findByEmail(
    email: UserDto['email'],
    includePassword?: false,
  ): Promise<UserDto | null>;
  findByEmail(
    email: UserDto['email'],
    includePassword?: boolean,
  ): Promise<UserDto | UserDtoWithPassword | null>;
  async findByEmail(
    email: UserDto['email'],
    includePassword = false,
  ): Promise<UserDto | UserDtoWithPassword | null> {
    const where: Prisma.UserWhereUniqueInput = {
      email,
    };
    if (includePassword) {
      return this.fetchUser(where, userSelectWithPassword);
    }
    return this.fetchUser(where, userSelect);
  }

  async createUser(data: CreateUserInput): Promise<UserDto> {
    return this.db.user.create({
      data,
      select: userSelect,
    });
  }
}
