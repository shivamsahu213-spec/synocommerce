import { PrismaClient, Tenant, Store, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

export async function seedAdmin(
  prisma: PrismaClient,
  tenant: Tenant,
  store: Store,
  superAdminRole: any
) {
  console.log('Seeding default Super Admin user...');

  const adminEmail = 'admin@synocommerce.local';
  const defaultPassword = process.env.SUPER_ADMIN_PASSWORD || 'SuperAdminPassword123!';
  const passwordHash = await bcrypt.hash(defaultPassword, 12);

  let adminUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        firstName: 'System',
        lastName: 'SuperAdmin',
        isActive: true,
        status: UserStatus.ACTIVE,
        tenantId: tenant.id,
        storeId: store.id,
      },
    });
  } else {
    adminUser = await prisma.user.update({
      where: { email: adminEmail },
      data: {
        passwordHash,
        isActive: true,
        status: UserStatus.ACTIVE,
        tenantId: tenant.id,
        storeId: store.id,
      },
    });
  }

  // Assign Super Admin Role
  if (superAdminRole) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: adminUser.id,
          roleId: superAdminRole.id,
        },
      },
      update: {},
      create: {
        userId: adminUser.id,
        roleId: superAdminRole.id,
      },
    });
  }

  console.log(`Default Super Admin user ready: ${adminUser.email} (${adminUser.id})`);
  return adminUser;
}
