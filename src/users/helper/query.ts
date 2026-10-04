import { Prisma } from '@prisma/client';

export const userSelect = {
  id: true,
  name: true,
  email: true,
} as const satisfies Prisma.UserSelect;

export const userSelectWithPassword = {
  ...userSelect,
  password: true,
} as const satisfies Prisma.UserSelect;

export type UserSelect = typeof userSelect;
export type UserSelectWithPassword = typeof userSelectWithPassword;

export type UserWhereUniqueArgs =
  | { id: number; email?: string }
  | { email: string; id?: number }
  | number
  | string;

export const buildUserWhereCondition = (
  input: Prisma.UserWhereUniqueInput,
): Prisma.UserWhereUniqueInput => {
  if (typeof input === 'number') {
    return { id: input };
  }
  if (typeof input === 'string') {
    return { email: input };
  }
  if (input.id !== undefined) {
    return { id: input.id };
  }
  if (input.email !== undefined) {
    return { email: input.email };
  }
  throw new Error(
    'Either id or email must be provided to build user where condition',
  );
};

export const buildUserWhere = buildUserWhereCondition;
