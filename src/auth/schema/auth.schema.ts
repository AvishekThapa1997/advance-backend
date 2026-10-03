import { email, z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().trim().min(1),
  email: z.email(),
  password: z.string().min(6),
});

export const signInSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type SignUpDto = z.infer<typeof signUpSchema>;
export type SignInDto = z.infer<typeof signInSchema>;
