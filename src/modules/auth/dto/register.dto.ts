import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address').transform((val) => val.toLowerCase().trim()),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password must not exceed 100 characters'),
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  tenantId: z.string().optional(),
  storeId: z.string().optional(),
});

export type RegisterDto = z.infer<typeof registerSchema>;
