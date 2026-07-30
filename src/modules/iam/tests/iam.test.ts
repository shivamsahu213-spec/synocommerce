/**
 * SynoCommerce IAM Module Integration & Security Unit Tests
 * @module modules/iam/tests/iam.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AuthenticationService,
  AuthorizationService,
  MfaService,
  SessionService,
  ApiKeyService,
  InMemoryUserRepositoryAdapter,
  InMemoryRoleRepositoryAdapter,
  InMemorySessionRepositoryAdapter,
  InMemoryApiKeyRepositoryAdapter,
  InMemoryAuditLogRepositoryAdapter,
  IamController,
  TotpUtil,
} from '../index';
import { UserIdentifier } from '../domain/value-objects';

test('IAM Authentication & User Lifecycle', async (t) => {
  const userRepo = new InMemoryUserRepositoryAdapter();
  const sessionRepo = new InMemorySessionRepositoryAdapter();
  const auditRepo = new InMemoryAuditLogRepositoryAdapter();
  const authService = new AuthenticationService(userRepo, sessionRepo, auditRepo);

  await t.test('Registers a new user and defaults to customer role', async () => {
    const user = await authService.register({
      email: 'john.doe@example.com',
      password: 'StrongPassword123!',
      firstName: 'John',
      lastName: 'Doe',
    });

    assert.equal(user.email, 'john.doe@example.com');
    assert.equal(user.firstName, 'John');
    assert.equal(user.status, 'PENDING_VERIFICATION');
    assert.deepEqual(user.roles, ['customer']);
  });

  await t.test('Prevents duplicate email registration', async () => {
    await assert.rejects(
      async () => {
        await authService.register({
          email: 'john.doe@example.com',
          password: 'AnotherPassword123!',
          firstName: 'John',
          lastName: 'Doe',
        });
      },
      /already exists/
    );
  });

  await t.test('Authenticates registered user and issues session token', async () => {
    const auth = await authService.login({
      email: 'john.doe@example.com',
      password: 'StrongPassword123!',
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0',
    });

    assert.ok(auth.accessToken.length > 0);
    assert.equal(auth.isMfaRequired, false);
  });

  await t.test('Enforces account lockout after 5 consecutive failed attempts', async () => {
    // Attempt 1 to 4
    for (let i = 0; i < 4; i++) {
      await assert.rejects(
        async () => {
          await authService.login({ email: 'john.doe@example.com', password: 'WrongPassword' });
        },
        /Invalid email or password/
      );
    }

    // 5th failed attempt triggers account lock
    await assert.rejects(
      async () => {
        await authService.login({ email: 'john.doe@example.com', password: 'WrongPassword' });
      },
      /Invalid email or password/
    );

    // Even with correct password, login is blocked due to lockout
    await assert.rejects(
      async () => {
        await authService.login({ email: 'john.doe@example.com', password: 'StrongPassword123!' });
      },
      /Invalid email or password/
    );
  });
});

test('IAM Authorization & Role Permission Evaluation', async (t) => {
  const userRepo = new InMemoryUserRepositoryAdapter();
  const roleRepo = new InMemoryRoleRepositoryAdapter();
  const sessionRepo = new InMemorySessionRepositoryAdapter();
  const auditRepo = new InMemoryAuditLogRepositoryAdapter();
  const authService = new AuthenticationService(userRepo, sessionRepo, auditRepo);
  const authorizationService = new AuthorizationService(userRepo, roleRepo);

  const registered = await authService.register({
    email: 'admin.user@example.com',
    password: 'AdminPassword123!',
    firstName: 'Admin',
    lastName: 'User',
  });

  await authService.verifyEmail(registered.id);

  await t.test('Evaluates customer permissions correctly', async () => {
    const isCartAllowed = await authorizationService.isAuthorized(registered.id, 'cart:add');
    const isOrdersReadAllowed = await authorizationService.isAuthorized(registered.id, 'orders:read');
    const isSystemAdminAllowed = await authorizationService.isAuthorized(registered.id, 'system:configure');

    assert.equal(isCartAllowed, true);
    assert.equal(isOrdersReadAllowed, true);
    assert.equal(isSystemAdminAllowed, false);
  });

  await t.test('Evaluates wildcard admin permissions correctly', async () => {
    const user = await userRepo.findById(new UserIdentifier(registered.id));
    user!.assignRole('admin');
    await userRepo.save(user!);

    const isSystemAdminAllowed = await authorizationService.isAuthorized(registered.id, 'system:configure');
    assert.equal(isSystemAdminAllowed, true);
  });
});

test('IAM Multi-Factor Authentication (TOTP)', async (t) => {
  const userRepo = new InMemoryUserRepositoryAdapter();
  const sessionRepo = new InMemorySessionRepositoryAdapter();
  const auditRepo = new InMemoryAuditLogRepositoryAdapter();
  const authService = new AuthenticationService(userRepo, sessionRepo, auditRepo);
  const mfaService = new MfaService(userRepo, auditRepo);

  const registered = await authService.register({
    email: 'mfa.user@example.com',
    password: 'MfaUserPassword123!',
    firstName: 'MFA',
    lastName: 'User',
  });

  await t.test('Enables MFA and generates valid RFC 6238 TOTP tokens', async () => {
    const mfaSetup = await mfaService.enableMfa(registered.id);
    assert.ok(mfaSetup.secret.length > 0);
    assert.ok(mfaSetup.qrCodeUri.includes('otpauth://totp/'));

    // Generate valid TOTP for secret
    const validOtp = TotpUtil.generateTotp(mfaSetup.secret);
    const isValid = await mfaService.verifyMfa(registered.id, validOtp);
    assert.equal(isValid, true);

    const isInvalid = await mfaService.verifyMfa(registered.id, '000000');
    assert.equal(isInvalid, false);
  });
});

test('IAM Session Management & API Keys', async (t) => {
  const sessionRepo = new InMemorySessionRepositoryAdapter();
  const apiKeyRepo = new InMemoryApiKeyRepositoryAdapter();
  const auditRepo = new InMemoryAuditLogRepositoryAdapter();
  const sessionService = new SessionService(sessionRepo, auditRepo);
  const apiKeyService = new ApiKeyService(apiKeyRepo, auditRepo);

  await t.test('Creates, validates, and revokes API keys', async () => {
    const apiKeyDto = await apiKeyService.createApiKey({
      userId: 'user_123',
      name: 'Integration Key',
      scopes: ['orders:read', 'catalog:read'],
      expiresInDays: 30,
    });

    assert.ok(apiKeyDto.rawKey!.startsWith('syno_sk_'));

    const validation = await apiKeyService.validateApiKey(apiKeyDto.rawKey!);
    assert.equal(validation.isValid, true);
    assert.equal(validation.userId, 'user_123');

    await apiKeyService.revokeApiKey(apiKeyDto.id);
    const postRevokeValidation = await apiKeyService.validateApiKey(apiKeyDto.rawKey!);
    assert.equal(postRevokeValidation.isValid, false);
  });
});
