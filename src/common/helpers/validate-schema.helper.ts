import { Logger } from '@nestjs/common';
import { z } from 'zod';

const logger = new Logger('Validation');

export async function validateSchema<T extends z.ZodType>(
  schema: T,
  data: unknown,
): Promise<z.ZodSafeParseResult<z.core.output<T>>> {
  const result = await schema.safeParseAsync(data);
  return result;
}
