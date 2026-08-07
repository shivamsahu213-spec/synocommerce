import { z } from 'zod';

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  newPassword: z
    .string()
    .min(8, 'New password must be at least 8 characters long')
    .max(100, 'Password must not exceed 100 characters'),
});

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
