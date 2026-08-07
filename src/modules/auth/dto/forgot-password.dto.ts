import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address').transform((val) => val.toLowerCase().trim()),
});

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;
