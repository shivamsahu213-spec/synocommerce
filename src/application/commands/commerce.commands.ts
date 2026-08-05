/**
 * Application Business Commands
 * @module application/commands/commerce.commands
 */

import {
  AddItemToCartInput,
  ApproveRefundInput,
  AuthorizePaymentInput,
  CapturePaymentInput,
  CreateShipmentInput,
  GenerateInvoiceInput,
  MergeCartInput,
  PlaceOrderInput,
  RemoveItemFromCartInput,
  RequestReturnInput,
  StartCheckoutInput,
} from '../dto';
import { CommandMetadata,ICommand } from './command.interface';

export abstract class BaseCommand<TResult = void> implements ICommand<TResult> {
  public readonly metadata: CommandMetadata;
  public abstract readonly commandName: string;

  constructor(correlationId?: string, userId?: string) {
    this.metadata = {
      commandId: crypto.randomUUID(),
      timestamp: new Date(),
      ...(correlationId !== undefined ? { correlationId } : {}),
      ...(userId !== undefined ? { userId } : {}),
    };
  }
}

export class CreateCartCommand extends BaseCommand<string> {
  public readonly commandName = 'CreateCartCommand';
  constructor(public readonly currency: string, public readonly customerId?: string, correlationId?: string) {
    super(correlationId, customerId);
  }
}

export class AddItemToCartCommand extends BaseCommand<void> {
  public readonly commandName = 'AddItemToCartCommand';
  constructor(public readonly input: AddItemToCartInput, correlationId?: string) {
    super(correlationId, input.customerId);
  }
}

export class RemoveItemFromCartCommand extends BaseCommand<void> {
  public readonly commandName = 'RemoveItemFromCartCommand';
  constructor(public readonly input: RemoveItemFromCartInput, correlationId?: string) {
    super(correlationId);
  }
}

export class MergeCartCommand extends BaseCommand<string> {
  public readonly commandName = 'MergeCartCommand';
  constructor(public readonly input: MergeCartInput, correlationId?: string) {
    super(correlationId);
  }
}

export class StartCheckoutCommand extends BaseCommand<string> {
  public readonly commandName = 'StartCheckoutCommand';
  constructor(public readonly input: StartCheckoutInput, correlationId?: string) {
    super(correlationId, input.customerId);
  }
}

export class ValidateCheckoutCommand extends BaseCommand<boolean> {
  public readonly commandName = 'ValidateCheckoutCommand';
  constructor(public readonly checkoutId: string, correlationId?: string) {
    super(correlationId);
  }
}

export class PlaceOrderCommand extends BaseCommand<string> {
  public readonly commandName = 'PlaceOrderCommand';
  constructor(public readonly input: PlaceOrderInput, correlationId?: string) {
    super(correlationId);
  }
}

export class ReserveInventoryCommand extends BaseCommand<void> {
  public readonly commandName = 'ReserveInventoryCommand';
  constructor(public readonly orderId: string, public readonly items: readonly { sku: string; qty: number }[], correlationId?: string) {
    super(correlationId);
  }
}

export class AuthorizePaymentCommand extends BaseCommand<string> {
  public readonly commandName = 'AuthorizePaymentCommand';
  constructor(public readonly input: AuthorizePaymentInput, correlationId?: string) {
    super(correlationId, input.customerId);
  }
}

export class CapturePaymentCommand extends BaseCommand<void> {
  public readonly commandName = 'CapturePaymentCommand';
  constructor(public readonly input: CapturePaymentInput, correlationId?: string) {
    super(correlationId);
  }
}

export class CreateShipmentCommand extends BaseCommand<string> {
  public readonly commandName = 'CreateShipmentCommand';
  constructor(public readonly input: CreateShipmentInput, correlationId?: string) {
    super(correlationId);
  }
}

export class RequestReturnCommand extends BaseCommand<string> {
  public readonly commandName = 'RequestReturnCommand';
  constructor(public readonly input: RequestReturnInput, correlationId?: string) {
    super(correlationId, input.customerId);
  }
}

export class ApproveRefundCommand extends BaseCommand<string> {
  public readonly commandName = 'ApproveRefundCommand';
  constructor(public readonly input: ApproveRefundInput, correlationId?: string) {
    super(correlationId);
  }
}

export class GenerateInvoiceCommand extends BaseCommand<string> {
  public readonly commandName = 'GenerateInvoiceCommand';
  constructor(public readonly input: GenerateInvoiceInput, correlationId?: string) {
    super(correlationId);
  }
}
