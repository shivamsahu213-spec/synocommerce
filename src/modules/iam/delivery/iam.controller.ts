/**
 * IAM REST Delivery Controller
 *
 * Implements REST handlers executing IAM Application Services.
 *
 * @module modules/iam/delivery/iam.controller
 */

import { DeliveryRequest, DeliveryResponse } from '../../../delivery';
import { ApiKeyService,AuthenticationService, AuthorizationService, MfaService, SessionService } from '../application';

export class IamController {
  private readonly _authService: AuthenticationService;
  private readonly _authorizationService: AuthorizationService;
  private readonly _mfaService: MfaService;
  private readonly _sessionService: SessionService;
  private readonly _apiKeyService: ApiKeyService;

  constructor(
    authService: AuthenticationService,
    authorizationService: AuthorizationService,
    mfaService: MfaService,
    sessionService: SessionService,
    apiKeyService: ApiKeyService
  ) {
    this._authService = authService;
    this._authorizationService = authorizationService;
    this._mfaService = mfaService;
    this._sessionService = sessionService;
    this._apiKeyService = apiKeyService;
  }

  public async register(req: DeliveryRequest): Promise<DeliveryResponse> {
    try {
      const user = await this._authService.register(req.body as any);
      return { statusCode: 201, headers: {}, data: { success: true, user } };
    } catch (err: any) {
      return { statusCode: 400, headers: {}, error: { success: false, message: err.message } };
    }
  }

  public async login(req: DeliveryRequest): Promise<DeliveryResponse> {
    try {
      const auth = await this._authService.login({
        ...(req.body as any),
        ipAddress: req.context.clientIp,
        userAgent: req.context.userAgent,
      });
      return { statusCode: 200, headers: {}, data: { success: true, auth } };
    } catch (err: any) {
      return { statusCode: 401, headers: {}, error: { success: false, message: err.message } };
    }
  }

  public async logout(req: DeliveryRequest): Promise<DeliveryResponse> {
    const token = req.headers['authorization']?.replace('Bearer ', '') || '';
    await this._authService.logout(token);
    return { statusCode: 200, headers: {}, data: { success: true, message: 'Logged out successfully' } };
  }

  public async getMe(req: DeliveryRequest): Promise<DeliveryResponse> {
    try {
      if (!req.context.userId) {
        return { statusCode: 401, headers: {}, error: { success: false, message: 'Unauthorized' } };
      }
      const user = await this._authService.getUserById(req.context.userId);
      return { statusCode: 200, headers: {}, data: { success: true, user } };
    } catch (err: any) {
      return { statusCode: 404, headers: {}, error: { success: false, message: err.message } };
    }
  }

  public async verifyEmail(req: DeliveryRequest): Promise<DeliveryResponse> {
    try {
      await this._authService.verifyEmail(req.context.userId || (req.body as any).userId);
      return { statusCode: 200, headers: {}, data: { success: true, message: 'Email verified' } };
    } catch (err: any) {
      return { statusCode: 400, headers: {}, error: { success: false, message: err.message } };
    }
  }

  public async changePassword(req: DeliveryRequest): Promise<DeliveryResponse> {
    try {
      const { currentPassword, newPassword } = req.body as any;
      await this._authService.changePassword(req.context.userId!, currentPassword, newPassword);
      return { statusCode: 200, headers: {}, data: { success: true, message: 'Password changed' } };
    } catch (err: any) {
      return { statusCode: 400, headers: {}, error: { success: false, message: err.message } };
    }
  }

  public async enableMfa(req: DeliveryRequest): Promise<DeliveryResponse> {
    try {
      const result = await this._mfaService.enableMfa(req.context.userId!);
      return { statusCode: 200, headers: {}, data: { success: true, mfa: result } };
    } catch (err: any) {
      return { statusCode: 400, headers: {}, error: { success: false, message: err.message } };
    }
  }

  public async verifyMfa(req: DeliveryRequest): Promise<DeliveryResponse> {
    const { token } = req.body as any;
    const isValid = await this._mfaService.verifyMfa(req.context.userId!, token);
    if (!isValid) {
      return { statusCode: 400, headers: {}, error: { success: false, message: 'Invalid MFA token' } };
    }
    return { statusCode: 200, headers: {}, data: { success: true, message: 'MFA verified' } };
  }

  public async getSessions(req: DeliveryRequest): Promise<DeliveryResponse> {
    const sessions = await this._sessionService.getUserSessions(req.context.userId!);
    return { statusCode: 200, headers: {}, data: { success: true, sessions } };
  }

  public async deleteSession(req: DeliveryRequest): Promise<DeliveryResponse> {
    await this._sessionService.revokeSession(req.params['id']!);
    return { statusCode: 200, headers: {}, data: { success: true, message: 'Session revoked' } };
  }

  public async createApiKey(req: DeliveryRequest): Promise<DeliveryResponse> {
    try {
      const apiKey = await this._apiKeyService.createApiKey({
        ...(req.body as any),
        userId: req.context.userId!,
      });
      return { statusCode: 201, headers: {}, data: { success: true, apiKey } };
    } catch (err: any) {
      return { statusCode: 400, headers: {}, error: { success: false, message: err.message } };
    }
  }

  public async getApiKeys(req: DeliveryRequest): Promise<DeliveryResponse> {
    const apiKeys = await this._apiKeyService.getUserApiKeys(req.context.userId!);
    return { statusCode: 200, headers: {}, data: { success: true, apiKeys } };
  }

  public async deleteApiKey(req: DeliveryRequest): Promise<DeliveryResponse> {
    await this._apiKeyService.revokeApiKey(req.params['id']!);
    return { statusCode: 200, headers: {}, data: { success: true, message: 'API key revoked' } };
  }
}
