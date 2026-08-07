import { z } from 'zod';

export const createProductVariantSchema = z.object({
  sku: z.string().min(1, 'Variant SKU is required'),
  barcode: z.string().optional(),
  price: z.number().positive().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  material: z.string().optional(),
  storage: z.string().optional(),
  packSize: z.string().optional(),
  weight: z.number().optional(),
  dimensions: z.object({
    length: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    unit: z.string().optional(),
  }).optional(),
  isActive: z.boolean().default(true),
});

export const createProductMediaSchema = z.object({
  url: z.string().url('Invalid asset URL'),
  type: z.enum(['image', 'video', 'pdf', 'manual', 'gallery', 'featured']).default('image'),
  altText: z.string().optional(),
  sortOrder: z.number().int().default(0),
});

export const createProductSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  name: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be greater than 0'),
  currency: z.enum(['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD', 'JPY', 'CNY']).default('USD'),
  status: z.enum(['DRAFT', 'ACTIVE', 'ARCHIVED', 'SCHEDULED']).default('DRAFT'),
  barcode: z.string().optional(),
  weight: z.number().optional(),
  dimensions: z.object({
    length: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    unit: z.string().optional(),
  }).optional(),
  brandId: z.string().optional(),
  categoryIds: z.array(z.string()).default([]),
  collectionIds: z.array(z.string()).default([]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.array(z.string()).default([]),
  canonicalUrl: z.string().optional(),
  ogImage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  variants: z.array(createProductVariantSchema).default([]),
  assets: z.array(createProductMediaSchema).default([]),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type CreateProductVariantDto = z.infer<typeof createProductVariantSchema>;
export type CreateProductMediaDto = z.infer<typeof createProductMediaSchema>;
