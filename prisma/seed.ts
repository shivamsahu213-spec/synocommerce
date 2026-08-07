import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { seedPermissions } from './seeds/permissions';
import { seedRoles } from './seeds/roles';
import { seedTenant } from './seeds/tenant';
import { seedStore } from './seeds/store';
import { seedAdmin } from './seeds/admin';

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🚀 Starting SynoCommerce database seeding...');

  try {
    // 1. Permissions
    const permissions = await seedPermissions(prisma);

    // 2. Roles
    const roles = await seedRoles(prisma, permissions);

    // 3. Tenant
    const tenant = await seedTenant(prisma);

    // 4. Store
    const store = await seedStore(prisma, tenant);

    // 5. Super Admin User
    const admin = await seedAdmin(prisma, tenant, store, roles['SUPER_ADMIN']);

    console.log('✅ SynoCommerce database seeding completed successfully!');
    console.log('----------------------------------------------------');
    console.log(`Tenant:      ${tenant.name} (${tenant.domain})`);
    console.log(`Store:       ${store.name} (${store.domain})`);
    console.log(`Super Admin: ${admin.email}`);
    console.log('----------------------------------------------------');
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
