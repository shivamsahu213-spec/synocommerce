import { PrismaClient, Tenant } from '@prisma/client';

export async function seedStore(prisma: PrismaClient, tenant: Tenant) {
  console.log('Seeding default Store...');

  const store = await prisma.store.upsert({
    where: { slug: 'main-store' },
    update: {
      name: 'Main Flagship Store',
      domain: 'store.synocommerce.local',
      tenantId: tenant.id,
      isActive: true,
    },
    create: {
      name: 'Main Flagship Store',
      slug: 'main-store',
      domain: 'store.synocommerce.local',
      tenantId: tenant.id,
      isActive: true,
    },
  });

  console.log(`Default Store ready: ${store.name} (${store.id})`);
  return store;
}
