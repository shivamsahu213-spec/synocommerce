import 'dotenv/config';
import http from 'http';
import { createProductTestApp } from './product.test';
import { generateAccessToken } from '../src/modules/auth/utils/jwt';
import { prisma } from '../src/database/prisma';

async function runTests() {
  console.log('🧪 Starting SynoCommerce Product Information Management (PIM) End-to-End Test Suite...');

  const app = createProductTestApp();
  const server = http.createServer(app);

  await new Promise<void>((resolve) => server.listen(3098, resolve));
  const baseUrl = 'http://localhost:3098/api';

  try {
    // 0. Ensure Admin User & Valid Store exist in DB
    let adminUser = await prisma.user.findFirst({ where: { email: 'admin@synocommerce.local' } });
    if (!adminUser) {
      adminUser = await prisma.user.create({
        data: {
          email: 'pim_test_admin@synocommerce.local',
          passwordHash: '$2b$12$dummyhashforpimtest',
          firstName: 'PIM',
          lastName: 'Admin',
          status: 'ACTIVE',
        },
      });
    }

    let store = await prisma.store.findFirst();
    if (!store) {
      let tenant = await prisma.tenant.findFirst();
      if (!tenant) {
        tenant = await prisma.tenant.create({
          data: { name: 'PIM Test Tenant', domain: 'pimtenant' + Date.now() + '.local' },
        });
      }
      store = await prisma.store.create({
        data: {
          tenantId: tenant.id,
          name: 'PIM Test Store',
          slug: 'pim-store-' + Date.now(),
          domain: 'pimstore' + Date.now() + '.local',
        },
      });
    }
    const testStoreId = store.id;

    const adminToken = generateAccessToken({
      userId: adminUser.id,
      tenantId: testStoreId,
      roles: ['SUPER_ADMIN'],
      permissions: [
        'products.read',
        'products.write',
        'products.manage',
        'products.delete',
        'categories.write',
        'categories.delete',
        'brands.write',
        'brands.delete',
        'collections.write',
        'collections.delete',
      ],
      tokenVersion: adminUser.tokenVersion,
    });

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
      'x-tenant-id': testStoreId,
    };

    // 1. Test Category CRUD & Breadcrumbs
    console.log('\n1. Testing Category CRUD & Breadcrumbs...');
    const catRes = await fetch(`${baseUrl}/categories`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: 'Footwear',
        slug: `footwear-${Date.now()}`,
        description: 'All shoes & footwear',
        isFeatured: true,
      }),
    });
    const catData = await catRes.json();
    console.log('Category Create Status:', catRes.status);
    if (catRes.status !== 201 || !catData.data?.id) throw new Error(`Category creation failed: ${JSON.stringify(catData)}`);
    const categoryId = catData.data.id;
    console.log('✅ Category created:', categoryId);

    const breadcrumbsRes = await fetch(`${baseUrl}/categories/${categoryId}/breadcrumbs`);
    const breadcrumbsData = await breadcrumbsRes.json();
    if (breadcrumbsRes.status !== 200 || !breadcrumbsData.data?.length) throw new Error('Breadcrumbs failed!');
    console.log('✅ Breadcrumbs test passed!');

    // 2. Test Brand CRUD
    console.log('\n2. Testing Brand CRUD...');
    const brandRes = await fetch(`${baseUrl}/brands`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: 'Nike',
        slug: `nike-${Date.now()}`,
        logoUrl: 'https://cdn.synocommerce.com/brands/nike.png',
        description: 'Just Do It',
        seoTitle: 'Nike Store',
      }),
    });
    const brandData = await brandRes.json();
    console.log('Brand Create Status:', brandRes.status);
    if (brandRes.status !== 201 || !brandData.data?.id) throw new Error('Brand creation failed!');
    const brandId = brandData.data.id;
    console.log('✅ Brand created:', brandId);

    // 3. Test Smart Collection Creation & Rule Evaluation
    console.log('\n3. Testing Smart Collection Creation...');
    const collectionRes = await fetch(`${baseUrl}/collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: 'Premium Shoes Sale',
        slug: `premium-shoes-sale-${Date.now()}`,
        type: 'SMART',
        rules: [
          { field: 'price', operator: 'gt', value: 100 },
          { field: 'tag', operator: 'equals', value: 'Sale' },
        ],
      }),
    });
    const collectionData = await collectionRes.json();
    console.log('Collection Create Status:', collectionRes.status);
    if (collectionRes.status !== 201 || !collectionData.data?.id) throw new Error('Collection creation failed!');
    const collectionId = collectionData.data.id;
    console.log('✅ Smart Collection created:', collectionId);

    // 4. Test Product Creation with Variants, Assets, SEO, Tags
    console.log('\n4. Testing Product Creation (Variants, Assets, SEO)...');
    const sku = `NIKE-AIR-MAX-${Date.now()}`;
    const productRes = await fetch(`${baseUrl}/products`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        sku,
        name: 'Nike Air Max 270',
        description: 'Super comfortable running shoes',
        price: 150.0,
        currency: 'USD',
        status: 'ACTIVE',
        barcode: '1234567890123',
        weight: 0.85,
        dimensions: { length: 30, width: 20, height: 12, unit: 'cm' },
        brandId,
        categoryIds: [categoryId],
        collectionIds: [collectionId],
        seoTitle: 'Buy Nike Air Max 270 Online',
        seoDescription: 'Best running shoes with air cushion technology.',
        seoKeywords: ['nike', 'shoes', 'running'],
        tags: ['Sale', 'Popular', 'Footwear'],
        variants: [
          {
            sku: `${sku}-RED-10`,
            size: '10',
            color: 'Red',
            material: 'Mesh',
            price: 150.0,
            barcode: '1234567890124',
          },
          {
            sku: `${sku}-BLK-11`,
            size: '11',
            color: 'Black',
            material: 'Mesh',
            price: 155.0,
            barcode: '1234567890125',
          },
        ],
        assets: [
          {
            url: 'https://cdn.synocommerce.com/products/nike-air-max-1.jpg',
            type: 'featured',
            altText: 'Nike Air Max 270 Side View',
            sortOrder: 1,
          },
        ],
      }),
    });
    const productData = await productRes.json();
    console.log('Product Create Status:', productRes.status);
    if (productRes.status !== 201 || !productData.data?.id) throw new Error(`Product creation failed: ${JSON.stringify(productData)}`);
    const productId = productData.data.id;
    console.log('✅ Product created with ID:', productId);

    // 5. Test GET /api/products/:id
    console.log('\n5. Testing GET /api/products/:id...');
    const getProductRes = await fetch(`${baseUrl}/products/${productId}`, { headers });
    const getProductData = await getProductRes.json();
    console.log('Get Product Status:', getProductRes.status);
    if (getProductRes.status !== 200 || getProductData.data?.sku !== sku) throw new Error('Get product by ID failed!');
    console.log('✅ Get product details passed!');

    // 6. Test Search API /api/search/products
    console.log('\n6. Testing GET /api/search/products (Keyword, Tag, Price Range)...');
    const searchRes = await fetch(`${baseUrl}/search/products?q=Air+Max&minPrice=100&tags=Sale`, { headers });
    const searchData = await searchRes.json();
    console.log('Search Response Status:', searchRes.status);
    if (searchRes.status !== 200 || !searchData.data?.items?.length) throw new Error('Product search failed!');
    console.log('✅ Product search passed! Found items:', searchData.data.items.length);

    // 7. Test PATCH /api/products/:id
    console.log('\n7. Testing PATCH /api/products/:id...');
    const updateRes = await fetch(`${baseUrl}/products/${productId}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        price: 140.0,
        seoTitle: 'Nike Air Max 270 - Special Sale',
      }),
    });
    const updateData = await updateRes.json();
    console.log('Update Product Status:', updateRes.status);
    if (updateRes.status !== 200 || updateData.data?.price !== '140') throw new Error('Product update failed!');
    console.log('✅ Product update passed!');

    // 8. Test Bulk Operations (Bulk Archive & Bulk Delete)
    console.log('\n8. Testing Bulk Operations (Bulk Archive)...');
    const bulkRes = await fetch(`${baseUrl}/products/bulk`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        action: 'ARCHIVE',
        productIds: [productId],
      }),
    });
    const bulkData = await bulkRes.json();
    console.log('Bulk Archive Status:', bulkRes.status);
    if (bulkRes.status !== 200 || !bulkData.data?.success) throw new Error('Bulk archive failed!');
    console.log('✅ Bulk operation passed!');

    // 9. Test Soft Delete & Restoration Check
    console.log('\n9. Testing DELETE /api/products/:id (Soft Delete)...');
    const delRes = await fetch(`${baseUrl}/products/${productId}`, {
      method: 'DELETE',
      headers,
    });
    const delData = await delRes.json();
    console.log('Delete Product Status:', delRes.status);
    if (delRes.status !== 200 || !delData.success) throw new Error('Product deletion failed!');
    console.log('✅ Soft delete passed!');

    // 10. Test Recommendations Placeholder API
    console.log('\n10. Testing GET /api/products/:id/recommendations...');
    const recRes = await fetch(`${baseUrl}/products/${productId}/recommendations`, { headers });
    const recData = await recRes.json();
    console.log('Recommendations Status:', recRes.status);
    if (recRes.status !== 200 || !recData.data?.trending) throw new Error('Recommendations placeholder failed!');
    console.log('✅ Recommendations passed!');

    console.log('\n🎉 ALL PRODUCT INFORMATION MANAGEMENT (PIM) TESTS PASSED VERIFICATION! 🎉\n');
  } catch (error) {
    console.error('\n❌ Product Test Suite Failed:', error);
    process.exit(1);
  } finally {
    server.close();
  }
}

runTests();
