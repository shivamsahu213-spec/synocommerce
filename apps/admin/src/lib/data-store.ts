/**
 * Working Data Store for Admin Platform
 * @module apps/admin/src/lib/data-store
 */

export interface ProductItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  variantsCount: number;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  total: number;
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED' | 'FAILED';
  fulfillmentStatus: 'FULFILLED' | 'UNFULFILLED' | 'PARTIAL' | 'CANCELLED';
  createdAt: string;
}

export interface CustomerItem {
  id: string;
  name: string;
  email: string;
  ordersCount: number;
  totalSpent: number;
  status: 'ACTIVE' | 'INACTIVE';
  joinedAt: string;
}

export interface PluginItem {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  status: 'ENABLED' | 'DISABLED';
  category: string;
}

export const INITIAL_PRODUCTS: ProductItem[] = [
  { id: 'prod_1', name: 'Syno Pro Wireless Headphones', sku: 'AUDIO-HP-001', price: 299.99, stock: 45, category: 'Audio & Electronics', brand: 'SynoTech', status: 'PUBLISHED', variantsCount: 3 },
  { id: 'prod_2', name: 'UltraSlim Mechanical Keyboard', sku: 'PERIPH-KB-002', price: 149.50, stock: 12, category: 'Computer Accessories', brand: 'SynoTech', status: 'PUBLISHED', variantsCount: 2 },
  { id: 'prod_3', name: 'Ergonomic Executive Chair', sku: 'FURN-CHR-003', price: 599.00, stock: 4, category: 'Furniture', brand: 'ErgoDesign', status: 'PUBLISHED', variantsCount: 4 },
  { id: 'prod_4', name: '4K UltraHD Smart Monitor 32"', sku: 'DISP-MON-004', price: 449.99, stock: 0, category: 'Monitors', brand: 'VisionPlus', status: 'PUBLISHED', variantsCount: 1 },
  { id: 'prod_5', name: 'Developer Desk Mat XL', sku: 'ACC-MAT-005', price: 29.99, stock: 120, category: 'Accessories', brand: 'SynoTech', status: 'PUBLISHED', variantsCount: 5 },
];

export const INITIAL_ORDERS: OrderItem[] = [
  { id: 'ord_1001', orderNumber: 'ORD-2026-1001', customerName: 'John Doe', customerEmail: 'john.doe@example.com', total: 449.49, paymentStatus: 'PAID', fulfillmentStatus: 'FULFILLED', createdAt: '2026-07-30T10:15:00Z' },
  { id: 'ord_1002', orderNumber: 'ORD-2026-1002', customerName: 'Alice Smith', customerEmail: 'alice.smith@example.com', total: 149.50, paymentStatus: 'PAID', fulfillmentStatus: 'UNFULFILLED', createdAt: '2026-07-30T11:30:00Z' },
  { id: 'ord_1003', orderNumber: 'ORD-2026-1003', customerName: 'Robert Johnson', customerEmail: 'robert.j@example.com', total: 599.00, paymentStatus: 'PENDING', fulfillmentStatus: 'UNFULFILLED', createdAt: '2026-07-30T12:45:00Z' },
  { id: 'ord_1004', orderNumber: 'ORD-2026-1004', customerName: 'Emma Watson', customerEmail: 'emma.w@example.com', total: 29.99, paymentStatus: 'REFUNDED', fulfillmentStatus: 'CANCELLED', createdAt: '2026-07-29T16:20:00Z' },
];

export const INITIAL_CUSTOMERS: CustomerItem[] = [
  { id: 'cust_1', name: 'John Doe', email: 'john.doe@example.com', ordersCount: 5, totalSpent: 1249.50, status: 'ACTIVE', joinedAt: '2026-01-15' },
  { id: 'cust_2', name: 'Alice Smith', email: 'alice.smith@example.com', ordersCount: 3, totalSpent: 448.50, status: 'ACTIVE', joinedAt: '2026-02-20' },
  { id: 'cust_3', name: 'Robert Johnson', email: 'robert.j@example.com', ordersCount: 1, totalSpent: 599.00, status: 'ACTIVE', joinedAt: '2026-05-10' },
  { id: 'cust_4', name: 'Emma Watson', email: 'emma.w@example.com', ordersCount: 2, totalSpent: 89.98, status: 'INACTIVE', joinedAt: '2026-03-01' },
];

export const INITIAL_PLUGINS: PluginItem[] = [
  { id: 'plug_1', name: 'Stripe Payments Pro', version: '2.4.0', author: 'SynoStack', description: 'Advanced Stripe payment gateway with subscription support.', status: 'ENABLED', category: 'Payments' },
  { id: 'plug_2', name: 'FedEx Shipping Calculator', version: '1.8.2', author: 'FedEx Integration', description: 'Live FedEx rate estimation and label printing.', status: 'ENABLED', category: 'Shipping' },
  { id: 'plug_3', name: 'Avalara Tax Automation', version: '3.1.0', author: 'Avalara', description: 'Automated global sales tax compliance and returns.', status: 'ENABLED', category: 'Tax' },
  { id: 'plug_4', name: 'Meilisearch Instant Search', version: '1.2.0', author: 'SynoStack', description: 'Sub-millisecond instant search and product filtering.', status: 'ENABLED', category: 'Search' },
  { id: 'plug_5', name: 'SendGrid Email Notifications', version: '1.0.5', author: 'SendGrid', description: 'Transactional email delivery for order status changes.', status: 'DISABLED', category: 'Marketing' },
];
