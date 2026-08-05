/**
 * Multi-Warehouse Routing & Location Optimization Engine
 * @module src/integrations/shipping/warehouse-router
 */

import { WarehouseLocation } from './types';

export class WarehouseRouterEngine {
  private warehouses: WarehouseLocation[] = [
    {
      warehouseId: 'wh_bhilai',
      name: 'Bhilai Central Hub',
      pincode: '490006',
      city: 'Bhilai',
      state: 'Chhattisgarh',
      country: 'India',
      priority: 1,
      availableCapacity: 5000,
      isHolidayToday: false,
      slaHours: 24,
    },
    {
      warehouseId: 'wh_raipur',
      name: 'Raipur Logistics Center',
      pincode: '492001',
      city: 'Raipur',
      state: 'Chhattisgarh',
      country: 'India',
      priority: 2,
      availableCapacity: 12000,
      isHolidayToday: false,
      slaHours: 24,
    },
    {
      warehouseId: 'wh_mumbai',
      name: 'Mumbai West Fulfillment Center',
      pincode: '400001',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      priority: 3,
      availableCapacity: 25000,
      isHolidayToday: false,
      slaHours: 12,
    },
  ];

  public selectOptimalWarehouse(destinationPincode: string): WarehouseLocation {
    // Select warehouse that has capacity and is not on holiday, ordered by priority
    const eligible = this.warehouses
      .filter((w) => w.availableCapacity > 0 && !w.isHolidayToday)
      .sort((a, b) => a.priority - b.priority);

    if (eligible.length === 0) {
      throw new Error('NO_AVAILABLE_WAREHOUSE: All fulfillment centers are at capacity or on holiday.');
    }

    const selected = eligible[0]!;
    selected.availableCapacity -= 1; // Reserve capacity
    return selected;
  }

  public getWarehouses(): WarehouseLocation[] {
    return this.warehouses;
  }
}
