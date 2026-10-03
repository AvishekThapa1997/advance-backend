import { UnprocessableEntityException } from '@nestjs/common';
import { APIError } from '../types/index.js';

export class SchemvalidationException extends UnprocessableEntityException {
  constructor(public readonly errorObj: APIError) {
    super();
  }
}
