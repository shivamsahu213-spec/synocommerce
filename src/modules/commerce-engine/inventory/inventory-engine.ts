/**
 * Inventory Engine Module
 *
 * Stock allocations, reservations, safety stock, and warehouse inventory tracking.
 *
 * @module modules/commerce-engine/inventory/inventory-engine
 */

import crypto from 'node:crypto';

export interface InventoryItem {
  readonly sku: string;
  readonly warehouseId: string;
  onHandQuantity: number;
  reservedQuantity: number;
  safetyStock: number;
  allowBackorder: boolean;
}

export interface InventoryReservation {
  readonly reservationId: string;
  readonly sku: string;
  readonly quantity: number;
  readonly expiresAt: Date;
}

export class InventoryEngine {
  private readonly _inventory = new Map<string, InventoryItem>();
  private readonly _reservations = new Map<string, InventoryReservation>();

  public setInventory(item: InventoryItem): void {
    const key = `${item.sku}:${item.warehouseId}`;
    this._inventory.set(key, item);
  }

  public getAvailableStock(sku: string): number {
    let totalAvailable = 0;
    for (const item of this._inventory.values()) {
      if (item.sku === sku) {
        const available = item.onHandQuantity - item.reservedQuantity - item.safetyStock;
        totalAvailable += Math.max(0, available);
      }
    }
    return totalAvailable;
  }

  public reserveStock(sku: string, quantity: number, ttlMinutes = 15): InventoryReservation {
    const available = this.getAvailableStock(sku);
    if (available < quantity) {
      throw new Error(`Insufficient stock for SKU '${sku}'. Requested: ${quantity}, Available: ${available}`);
    }

    // Allocate from first warehouse with available stock
    for (const item of this._inventory.values()) {
      if (item.sku === sku) {
        item.reservedQuantity += quantity;
        break;
      }
    }

    const reservation: InventoryReservation = {
      reservationId: `res_${crypto.randomUUID()}`,
      sku,
      quantity,
      expiresAt: new Date(Date.now() + ttlMinutes * 60 * 1000),
    };

    this._reservations.set(reservation.reservationId, reservation);
    return reservation;
  }

  public releaseReservation(reservationId: string): void {
    const res = this._reservations.get(reservationId);
    if (res) {
      for (const item of this._inventory.values()) {
        if (item.sku === res.sku) {
          item.reservedQuantity = Math.max(0, item.reservedQuantity - res.quantity);
          break;
        }
      }
      this._reservations.delete(reservationId);
    }
  }
}
