/**
 * Admin IAM Integration Client
 *
 * Connects Admin UI directly to the SynoCommerce IAM Module services.
 *
 * @module apps/admin/src/lib/iam-client
 */

import {
  ApiKeyService,
  AuthenticationService,
  AuthorizationService,
  InMemoryApiKeyRepositoryAdapter,
  InMemoryAuditLogRepositoryAdapter,
  InMemoryRoleRepositoryAdapter,
  InMemorySessionRepositoryAdapter,
  InMemoryUserRepositoryAdapter,
  MfaService,
  SessionService,
} from '@/modules/iam';

// Singleton instances for client runtime state
const userRepo = new InMemoryUserRepositoryAdapter();
const roleRepo = new InMemoryRoleRepositoryAdapter();
const sessionRepo = new InMemorySessionRepositoryAdapter();
const apiKeyRepo = new InMemoryApiKeyRepositoryAdapter();
const auditRepo = new InMemoryAuditLogRepositoryAdapter();

export const authService = new AuthenticationService(userRepo, sessionRepo, auditRepo);
export const authorizationService = new AuthorizationService(userRepo, roleRepo);
export const sessionService = new SessionService(sessionRepo, auditRepo);
export const apiKeyService = new ApiKeyService(apiKeyRepo, auditRepo);
export const mfaService = new MfaService(userRepo, auditRepo);

// Pre-seed an Admin User for instant login access
(async () => {
  try {
    const existing = await userRepo.findByEmail({ value: 'admin@synocommerce.com', equals: () => false } as any);
    if (!existing) {
      const userDto = await authService.register({
        email: 'admin@synocommerce.com',
        password: 'AdminPassword123!',
        firstName: 'System',
        lastName: 'Admin',
      });
      await authService.verifyEmail(userDto.id);
      const user = await userRepo.findById({ value: userDto.id } as any);
      if (user) {
        user.assignRole('admin');
        await userRepo.save(user);
      }
    }
  } catch (err) {
    // Already seeded or ignore
  }
})();
