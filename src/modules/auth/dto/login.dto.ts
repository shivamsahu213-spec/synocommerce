import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address').transform((val) => val.toLowerCase().trim()),
  password: z.string().min(1, 'Password is required'),
  tenantId: z.string().optional(),
});

export type LoginDto = z.infer<typeof loginSchema>;
