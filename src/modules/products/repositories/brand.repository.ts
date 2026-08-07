import { BaseRepository } from '../../../database/repository/base.repository';
import { Brand } from '@prisma/client';
import { prisma } from '../../../database/prisma';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';

export class BrandRepository extends BaseRepository<Brand> {
  protected model = 'brand' as const;

  async createBrand(storeId: string, dto: CreateBrandDto): Promise<Brand> {
    return prisma.brand.create({
      data: {
        storeId,
        name: dto.name,
        slug: dto.slug,
        logoUrl: dto.logoUrl ?? null,
        description: dto.description ?? null,
        seoTitle: dto.seoTitle ?? null,
        seoDescription: dto.seoDescription ?? null,
        isActive: dto.isActive ?? true,
      },
    });
  }

  async updateBrand(id: string, dto: UpdateBrandDto): Promise<Brand> {
    return prisma.brand.update({
      where: { id },
      data: {
        ...(dto.name ? { name: dto.name } : {}),
        ...(dto.slug ? { slug: dto.slug } : {}),
        ...(dto.logoUrl !== undefined ? { logoUrl: dto.logoUrl } : {}),
        ...(dto.description !== undefined ? { description: dto.description } : {}),
        ...(dto.seoTitle !== undefined ? { seoTitle: dto.seoTitle } : {}),
        ...(dto.seoDescription !== undefined ? { seoDescription: dto.seoDescription } : {}),
        ...(dto.isActive !== undefined ? { isActive: dto.isActive } : {}),
      },
    });
  }

  async softDeleteBrand(id: string): Promise<Brand> {
    return prisma.brand.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });
  }
}

export const brandRepository = new BrandRepository();
