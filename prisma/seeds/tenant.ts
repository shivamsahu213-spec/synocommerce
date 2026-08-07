import { PrismaClient } from '@prisma/client';

export async function seedTenant(prisma: PrismaClient) {
  console.log('Seeding default Tenant...');

  const tenant = await prisma.tenant.upsert({
    where: { domain: 'synocommerce.local' },
    update: {
      name: 'SynoCommerce HQ',
      isActive: true,
    },
    create: {
      name: 'SynoCommerce HQ',
      domain: 'synocommerce.local',
      isActive: true,
    },
  });

  console.log(`Default Tenant ready: ${tenant.name} (${tenant.id})`);
  return tenant;
}
