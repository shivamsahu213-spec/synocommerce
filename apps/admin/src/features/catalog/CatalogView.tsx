/**
 * Catalog Feature View
 * @module apps/admin/src/features/catalog/CatalogView
 */

'use client';

import { Bookmark,Package, Plus, Tag } from 'lucide-react';
import React, { useState } from 'react';

import { ColumnDef,DataTable } from '../../components/shared/data-table';
import { INITIAL_PRODUCTS, ProductItem } from '../../lib/data-store';
import { formatCurrency } from '../../lib/utils';

export function CatalogView() {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductSku, setNewProductSku] = useState('');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice || !newProductSku) return;

    const item: ProductItem = {
      id: `prod_${Date.now()}`,
      name: newProductName,
      sku: newProductSku,
      price: parseFloat(newProductPrice),
      stock: 50,
      category: 'General',
      brand: 'SynoBrand',
      status: 'PUBLISHED',
      variantsCount: 1,
    };

    setProducts([item, ...products]);
    setNewProductName('');
    setNewProductPrice('');
    setNewProductSku('');
    setIsModalOpen(false);
  };

  const columns: ColumnDef<ProductItem>[] = [
    { key: 'name', header: 'Product Name' },
    { key: 'sku', header: 'SKU' },
    { key: 'price', header: 'Price', render: (p) => formatCurrency(p.price) },
    { key: 'stock', header: 'Stock', render: (p) => <span className={p.stock === 0 ? 'text-red-500 font-bold' : ''}>{p.stock}</span> },
    { key: 'category', header: 'Category' },
    { key: 'status', header: 'Status', render: (p) => <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">{p.status}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Product Catalog</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage store products, variants, categories, and attributes.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      <DataTable data={products} columns={columns} searchPlaceholder="Search products by name or SKU..." />

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="mt-4 space-y-4 text-sm">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300">SKU</label>
                <input
                  type="text"
                  required
                  value={newProductSku}
                  onChange={(e) => setNewProductSku(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
