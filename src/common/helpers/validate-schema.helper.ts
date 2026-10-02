import { Logger } from '@nestjs/common';
import { z } from 'zod';

const logger = new Logger('Validation');

export function validateSchema<T extends z.ZodType>(
  schema: T,
  data: unknown,
): z.ZodSafeParseResult<z.core.output<T>> {
  const result = schema.safeParse(data);
  return result;
}
