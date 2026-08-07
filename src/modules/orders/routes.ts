import { Router } from 'express';
import { orderController } from './controllers/order.controller';
import { checkoutController } from './controllers/checkout.controller';
import { shipmentController } from './controllers/shipment.controller';
import { refundController } from './controllers/refund.controller';
import { invoiceController } from './controllers/invoice.controller';
import { authenticate } from '../auth/middleware/authenticate';
import { authorize } from '../auth/middleware/authorize';
import { optionalAuth } from '../auth/middleware/optionalAuth';

const router = Router();

// ==========================================
// Checkout APIs
// ==========================================
router.post('/checkout', optionalAuth, checkoutController.checkout);

// ==========================================
// Customer APIs (/api/my/orders)
// ==========================================
router.get('/my/orders', authenticate, orderController.getMyOrders);
router.get('/my/orders/:id', authenticate, orderController.getMyOrderById);
router.post('/my/orders/:id/cancel', authenticate, orderController.cancelMyOrder);
router.post('/my/orders/:id/return', authenticate, orderController.returnMyOrder);

// ==========================================
// Admin Workflow APIs (/api/admin/orders)
// ==========================================
router.post('/admin/orders/:id/approve', authenticate, authorize('orders.manage'), orderController.approveOrder);
router.post('/admin/orders/:id/ship', authenticate, authorize('orders.manage'), orderController.shipOrder);
router.post('/admin/orders/:id/deliver', authenticate, authorize('orders.manage'), orderController.deliverOrder);
router.post('/admin/orders/:id/refund', authenticate, authorize('orders.manage'), orderController.refundOrder);

// ==========================================
// General Order APIs (/api/orders)
// ==========================================
router.get('/orders/search', authenticate, authorize('orders.read'), orderController.searchOrders);
router.post('/orders', authenticate, authorize('orders.create'), orderController.createOrder);
router.get('/orders', authenticate, authorize('orders.read'), orderController.searchOrders);
router.get('/orders/:id', authenticate, orderController.getOrderById);
router.patch('/orders/:id', authenticate, authorize('orders.update'), orderController.updateOrder);
router.delete('/orders/:id', authenticate, authorize('orders.delete'), orderController.deleteOrder);

// ==========================================
// Shipment APIs (/api/shipments)
// ==========================================
router.post('/shipments', authenticate, authorize('shipments.create'), shipmentController.createShipment);
router.get('/shipments/:id', authenticate, shipmentController.getShipmentById);
router.patch('/shipments/:id', authenticate, authorize('shipments.update'), shipmentController.updateShipment);

// ==========================================
// Refund APIs (/api/refunds)
// ==========================================
router.post('/refunds', authenticate, refundController.requestRefund);
router.post('/refunds/:id/approve', authenticate, authorize('refunds.manage'), refundController.approveRefund);
router.get('/refunds/order/:orderId', authenticate, refundController.getRefundsForOrder);

// ==========================================
// Invoice APIs (/api/invoices)
// ==========================================
router.get('/invoices/order/:orderId', authenticate, invoiceController.getInvoiceByOrderId);

export default router;
