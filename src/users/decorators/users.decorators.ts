import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../constants/users.constants.js';

export const InjectUserRepository = () => Inject(USER_REPOSITORY);
