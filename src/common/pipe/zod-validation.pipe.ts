import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import z, { ZodType } from 'zod';
import { APIError, APIFieldError } from '../types/index.js';
import { SchemvalidationException } from '../exception/schema-validation.exception.js';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedResult = z.safeParse(this.schema, value);
      if (!parsedResult.error) {
        return parsedResult.data;
      }
      const formattedIssueMessages: Record<string, APIFieldError> =
        parsedResult.error.issues.reduce(
          (accum, curr) => {
            const field = curr.path.at(-1) as string;
            const { code, message } = curr;
            accum[field] = {
              code,
              message,
            };
            return accum;
          },
          {} as Record<string, APIFieldError>,
        );
      const error: APIError = {
        fields: formattedIssueMessages,
        message: 'Validation failed',
      };
      throw new SchemvalidationException(error);
    } catch (error) {
      throw error;
    }
  }
}
