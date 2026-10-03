import { Logger } from '@nestjs/common';
import { z } from 'zod';
import { validateSchema } from '../../common/helpers/validate-schema.helper.js';

const logger = new Logger('EnvValidation');

export const envSchema = z.object({
  PORT: z.coerce.number().int().optional().default(3000),
  DATABASE_URL: z.string(),
  REDIS_URL: z.string().optional(),
  REDIS_TOKEN: z.string().optional(),
});

export type EnvironmentVariables = z.infer<typeof envSchema>;

export function validateEnvironment(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const result = validateSchema(envSchema, config);
  if (result.error) {
    logger.error(`Environment validation failed: ${result.error.message}`);
    process.exit(1);
  }
  return result.data;
}
