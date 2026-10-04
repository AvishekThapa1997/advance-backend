import { Prisma } from '@prisma/client';
import { userSelect, userSelectWithPassword } from '../helper/query.js';

export type UserDto = Prisma.UserGetPayload<{
  select: typeof userSelect;
}>;

export type UserDtoWithPassword = UserDto &
  Prisma.UserGetPayload<{
    select: typeof userSelectWithPassword;
  }>;

export type CreateUserInput = Prisma.UserCreateInput;
