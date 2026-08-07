import { Router, Request, Response, NextFunction } from 'express';
import { productController } from './controllers/product.controller';
import { categoryController } from './controllers/category.controller';
import { brandController } from './controllers/brand.controller';
import { collectionController } from './controllers/collection.controller';
import { assetController } from './controllers/asset.controller';
import { searchService } from './services/search.service';
import { recommendationService } from './services/recommendation.service';
import { authenticate } from '../auth/middleware/authenticate';
import { authorize } from '../auth/middleware/authorize';
import { optionalAuth } from '../auth/middleware/optionalAuth';
import { productSearchQuerySchema } from './dto/search.dto';

const router = Router();

// ==================== PRODUCT SEARCH & RECOMMENDATIONS ====================
router.get('/search/products', optionalAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = productSearchQuerySchema.parse(req.query);
    const storeId = ((req as any).user?.tenantId as string) || ((req.headers['x-tenant-id'] as string) ?? 'default-store');
    const result = await searchService.searchProducts(storeId, query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

router.get('/products/:id/recommendations', optionalAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const storeId = ((req as any).user?.tenantId as string) || ((req.headers['x-tenant-id'] as string) ?? 'default-store');
    const related = await recommendationService.getRelatedProducts(id, storeId);
    const frequentlyBought = await recommendationService.getFrequentlyBoughtTogether(id, storeId);
    const trending = await recommendationService.getTrendingProducts(storeId);
    res.status(200).json({
      success: true,
      data: { related, frequentlyBought, trending },
    });
  } catch (error) {
    next(error);
  }
});

// ==================== PRODUCT CRUD & BULK ====================
router.post('/products/bulk', authenticate, authorize('products.write', 'products.manage'), (req, res, next) => productController.bulk(req, res, next));
router.post('/products', authenticate, authorize('products.write', 'products.manage'), (req, res, next) => productController.create(req, res, next));
router.get('/products', optionalAuth, (req, res, next) => productController.list(req, res, next));
router.get('/products/:id', optionalAuth, (req, res, next) => productController.getById(req, res, next));
router.patch('/products/:id', authenticate, authorize('products.write', 'products.manage'), (req, res, next) => productController.update(req, res, next));
router.delete('/products/:id', authenticate, authorize('products.delete', 'products.manage'), (req, res, next) => productController.delete(req, res, next));

// ==================== CATEGORIES ====================
router.post('/categories', authenticate, authorize('categories.write', 'products.manage'), (req, res, next) => categoryController.create(req, res, next));
router.get('/categories/tree', optionalAuth, (req, res, next) => categoryController.tree(req, res, next));
router.get('/categories/:id/breadcrumbs', optionalAuth, (req, res, next) => categoryController.breadcrumbs(req, res, next));
router.patch('/categories/:id', authenticate, authorize('categories.write', 'products.manage'), (req, res, next) => categoryController.update(req, res, next));
router.delete('/categories/:id', authenticate, authorize('categories.delete', 'products.manage'), (req, res, next) => categoryController.delete(req, res, next));

// ==================== BRANDS ====================
router.post('/brands', authenticate, authorize('brands.write', 'products.manage'), (req, res, next) => brandController.create(req, res, next));
router.get('/brands', optionalAuth, (req, res, next) => brandController.list(req, res, next));
router.get('/brands/:id', optionalAuth, (req, res, next) => brandController.getById(req, res, next));
router.patch('/brands/:id', authenticate, authorize('brands.write', 'products.manage'), (req, res, next) => brandController.update(req, res, next));
router.delete('/brands/:id', authenticate, authorize('brands.delete', 'products.manage'), (req, res, next) => brandController.delete(req, res, next));

// ==================== COLLECTIONS ====================
router.post('/collections', authenticate, authorize('collections.write', 'products.manage'), (req, res, next) => collectionController.create(req, res, next));
router.get('/collections', optionalAuth, (req, res, next) => collectionController.list(req, res, next));
router.get('/collections/:id', optionalAuth, (req, res, next) => collectionController.getById(req, res, next));
router.patch('/collections/:id', authenticate, authorize('collections.write', 'products.manage'), (req, res, next) => collectionController.update(req, res, next));
router.delete('/collections/:id', authenticate, authorize('collections.delete', 'products.manage'), (req, res, next) => collectionController.delete(req, res, next));

// ==================== ASSETS ====================
router.post('/assets', authenticate, authorize('products.write', 'products.manage'), (req, res, next) => assetController.create(req, res, next));
router.get('/assets', optionalAuth, (req, res, next) => assetController.list(req, res, next));

export default router;
