import { DomainError } from '../..';

export class AddressError extends DomainError {
  constructor(message: string, code: string = 'ADDRESS_ERROR') {
    super(message, code);
  }
}

export class InvalidAddressError extends AddressError {
  constructor(reason: string) {
    super(`Invalid address structure: ${reason}`, 'INVALID_ADDRESS');
  }
}
