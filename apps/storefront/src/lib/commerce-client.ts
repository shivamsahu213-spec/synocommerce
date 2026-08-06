/**
 * Storefront Commerce Engine & IAM Client Integration
 * @module apps/storefront/src/lib/commerce-client
 */

import {
  CartAggregate,
  CartEngine,
  type CartItem,
  type CartTotals,
  CheckoutEngine,
  InventoryEngine,
  OrderEngine,
  type OrderRecord,
  PaymentEngine,
  PricingEngine,
  PromotionEngine,
  RecommendationEngine,
  SearchEngine,
  SearchProductDoc,
  TaxEngine,
} from '@/modules/commerce-engine';
import {
  AuthenticationService,
  InMemoryAuditLogRepositoryAdapter,
  InMemorySessionRepositoryAdapter,
  InMemoryUserRepositoryAdapter,
} from '@/modules/iam';

export { CartAggregate };
export type { CartItem, CartTotals, OrderRecord, SearchProductDoc };

// Singleton Engines
export const pricingEngine = new PricingEngine();
export const promotionEngine = new PromotionEngine();
export const inventoryEngine = new InventoryEngine();
export const taxEngine = new TaxEngine();
export const cartEngine = new CartEngine(pricingEngine, promotionEngine, taxEngine);
export const paymentEngine = new PaymentEngine();
export const orderEngine = new OrderEngine();
export const checkoutEngine = new CheckoutEngine(cartEngine, inventoryEngine, paymentEngine, orderEngine);
export const searchEngine = new SearchEngine();
export const recommendationEngine = new RecommendationEngine();

const userRepo = new InMemoryUserRepositoryAdapter();
const sessionRepo = new InMemorySessionRepositoryAdapter();
const auditRepo = new InMemoryAuditLogRepositoryAdapter();
export const authService = new AuthenticationService(userRepo, sessionRepo, auditRepo);

// Seed Initial Catalog Data for Storefront Engine
export const STOREFRONT_PRODUCTS: SearchProductDoc[] = [
  { id: 'prod_1', sku: 'AUDIO-HP-001', name: 'Syno Pro Wireless Headphones', category: 'Audio', brand: 'SynoTech', price: 299.99, tags: ['headphones', 'wireless', 'audio'] },
  { id: 'prod_2', sku: 'PERIPH-KB-002', name: 'UltraSlim Mechanical Keyboard', category: 'Accessories', brand: 'SynoTech', price: 149.50, tags: ['keyboard', 'mechanical'] },
  { id: 'prod_3', sku: 'FURN-CHR-003', name: 'Ergonomic Executive Chair', category: 'Furniture', brand: 'ErgoDesign', price: 599.00, tags: ['chair', 'furniture'] },
  { id: 'prod_4', sku: 'DISP-MON-004', name: '4K UltraHD Smart Monitor 32"', category: 'Monitors', brand: 'VisionPlus', price: 449.99, tags: ['monitor', '4k'] },
];

// Index in Search Engine & Inventory
STOREFRONT_PRODUCTS.forEach((p) => {
  searchEngine.indexProduct(p);
  pricingEngine.setProductPrice({ sku: p.sku, basePrice: p.price, currency: 'USD' });
  inventoryEngine.setInventory({
    sku: p.sku,
    warehouseId: 'WH-MAIN',
    onHandQuantity: 50,
    reservedQuantity: 0,
    safetyStock: 2,
    allowBackorder: false,
  });
});

recommendationEngine.setCatalog(STOREFRONT_PRODUCTS);

// Register Sample Coupons
promotionEngine.registerPromotion({ code: 'WELCOME10', type: 'PERCENTAGE', value: 10 });
promotionEngine.registerPromotion({ code: 'FREESHIP', type: 'FREE_SHIPPING', value: 0 });
