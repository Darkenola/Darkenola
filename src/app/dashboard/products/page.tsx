'use client'

import { useState } from 'react'
import { Search, Plus, Edit2, Trash2, Package } from 'lucide-react'
import { clsx } from 'clsx'

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

const initialProducts: Product[] = [
  { id: 1, name: 'Wireless Headphones Pro', category: 'Electronics', price: 149.99, stock: 234, status: 'In Stock' },
  { id: 2, name: 'Ergonomic Office Chair', category: 'Furniture', price: 399.00, stock: 45, status: 'In Stock' },
  { id: 3, name: 'USB-C Hub 7-in-1', category: 'Electronics', price: 59.99, stock: 12, status: 'Low Stock' },
  { id: 4, name: 'Mechanical Keyboard', category: 'Electronics', price: 129.00, stock: 0, status: 'Out of Stock' },
  { id: 5, name: 'Standing Desk Converter', category: 'Furniture', price: 249.99, stock: 88, status: 'In Stock' },
  { id: 6, name: 'Webcam 4K Ultra', category: 'Electronics', price: 89.99, stock: 5, status: 'Low Stock' },
  { id: 7, name: 'Noise Cancelling Earbuds', category: 'Electronics', price: 199.00, stock: 167, status: 'In Stock' },
  { id: 8, name: 'Monitor LED 27"', category: 'Electronics', price: 329.00, stock: 34, status: 'In Stock' },
  { id: 9, name: 'Laptop Stand Aluminum', category: 'Accessories', price: 49.99, stock: 0, status: 'Out of Stock' },
  { id: 10, name: 'Desk Lamp Smart LED', category: 'Furniture', price: 79.99, stock: 123, status: 'In Stock' },
]

const categoryColors: Record<string, string> = {
  Electronics: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  Furniture: 'bg-green-500/10 text-green-600 dark:text-green-400',
  Accessories: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
}

const statusColors: Record<string, string> = {
  'In Stock': 'bg-green-500/10 text-green-600 dark:text-green-400',
  'Low Stock': 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  'Out of Stock': 'bg-red-500/10 text-red-600 dark:text-red-400',
}

const emptyProduct: Omit<Product, 'id'> = { name: '', category: 'Electronics', price: 0, stock: 0, status: 'In Stock' }

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [form, setForm] = useState<Omit<Product, 'id'>>(emptyProduct)

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))]

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = filterCategory === 'All' || p.category === filterCategory
    return matchSearch && matchCategory
  })

  function openAdd() {
    setEditingProduct(null)
    setForm(emptyProduct)
    setModalOpen(true)
  }

  function openEdit(product: Product) {
    setEditingProduct(product)
    setForm({ name: product.name, category: product.category, price: product.price, stock: product.stock, status: product.status })
    setModalOpen(true)
  }

  function handleDelete(id: number) {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  function handleSave() {
    if (!form.name) return
    if (editingProduct) {
      setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? { ...editingProduct, ...form } : p)))
    } else {
      const newId = Math.max(...products.map((p) => p.id), 0) + 1
      setProducts((prev) => [...prev, { id: newId, ...form }])
    }
    setModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Products</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">{filtered.length} products</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-100 dark:bg-slate-900 border border-transparent dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={clsx('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                  filterCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-slate-700">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Product</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider hidden sm:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Price</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider hidden md:table-cell">Stock</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={clsx('px-2 py-1 rounded-md text-xs font-medium', categoryColors[product.category] ?? 'bg-gray-100 text-gray-600')}>
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-slate-400 hidden md:table-cell">{product.stock}</td>
                  <td className="px-4 py-3">
                    <span className={clsx('px-2 py-1 rounded-full text-xs font-medium', statusColors[product.status])}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(product)} className="p-1.5 rounded-lg text-gray-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-1.5 rounded-lg text-gray-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Product Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Electronics</option>
                  <option>Furniture</option>
                  <option>Accessories</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Stock</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as Product['status'] })}
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>In Stock</option>
                  <option>Low Stock</option>
                  <option>Out of Stock</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 py-2 px-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {editingProduct ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
