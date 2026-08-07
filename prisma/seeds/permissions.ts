import { PrismaClient, PermissionAction, PermissionResource } from '@prisma/client';

export async function seedPermissions(prisma: PrismaClient) {
  console.log('Seeding permissions...');

  const actions = Object.values(PermissionAction);
  const resources = Object.values(PermissionResource);

  const permissionsToCreate = [];

  for (const resource of resources) {
    for (const action of actions) {
      permissionsToCreate.push({
        action,
        resource,
        description: `Allows ${action} action on ${resource} resource`,
      });
    }
  }

  const seededPermissions = [];

  for (const perm of permissionsToCreate) {
    // Find existing by action + resource or create
    const existing = await prisma.permission.findFirst({
      where: {
        action: perm.action,
        resource: perm.resource,
      },
    });

    if (existing) {
      seededPermissions.push(existing);
    } else {
      const created = await prisma.permission.create({
        data: perm,
      });
      seededPermissions.push(created);
    }
  }

  console.log(`Successfully seeded ${seededPermissions.length} permissions.`);
  return seededPermissions;
}
