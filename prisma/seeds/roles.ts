import { PrismaClient, RoleScope, Permission } from '@prisma/client';

export async function seedRoles(prisma: PrismaClient, permissions: Permission[]) {
  console.log('Seeding roles & role-permissions...');

  const rolesData = [
    {
      name: 'SUPER_ADMIN',
      scope: RoleScope.GLOBAL,
      description: 'Full system-wide administrative access across all tenants and stores',
    },
    {
      name: 'TENANT_ADMIN',
      scope: RoleScope.TENANT,
      description: 'Full administrative access within a single tenant',
    },
    {
      name: 'STORE_ADMIN',
      scope: RoleScope.STORE,
      description: 'Full administrative access within a single store',
    },
    {
      name: 'STORE_MANAGER',
      scope: RoleScope.STORE,
      description: 'Operational access to manage store catalog, orders, and inventory',
    },
    {
      name: 'CUSTOMER',
      scope: RoleScope.STORE,
      description: 'Standard end-user customer role for storefront operations',
    },
  ];

  const seededRoles: Record<string, any> = {};

  for (const roleDef of rolesData) {
    let role = await prisma.role.findFirst({
      where: {
        name: roleDef.name,
        scope: roleDef.scope,
        tenantId: null,
        storeId: null,
      },
    });

    if (!role) {
      role = await prisma.role.create({
        data: {
          name: roleDef.name,
          scope: roleDef.scope,
        },
      });
    }

    seededRoles[roleDef.name] = role;

    // Attach permissions
    let rolePerms = permissions;
    if (roleDef.name === 'STORE_MANAGER') {
      rolePerms = permissions.filter((p) =>
        ['PRODUCT', 'ORDER', 'INVENTORY', 'MEDIA', 'PAGE'].includes(p.resource)
      );
    } else if (roleDef.name === 'CUSTOMER') {
      rolePerms = permissions.filter(
        (p) => p.action === 'READ' && ['PRODUCT', 'PAGE', 'MEDIA'].includes(p.resource)
      );
    }

    for (const perm of rolePerms) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId: perm.id,
          },
        },
        update: {},
        create: {
          roleId: role.id,
          permissionId: perm.id,
        },
      });
    }
  }

  console.log(`Successfully seeded ${Object.keys(seededRoles).length} default roles with permissions.`);
  return seededRoles;
}
