'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaUpload } from 'react-icons/fa';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input, { TextArea } from '@/components/Input';
import Loading from '@/components/Loading';
import { productAPI, uploadAPI } from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import Image from 'next/image';

export default function AdminProducts() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image_url: '',
    features: '',
    is_featured: false,
    is_available: true,
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin');
      return;
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await uploadAPI.upload(file);
      setFormData({ ...formData, image_url: response.data.url });
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      features: formData.features ? JSON.stringify(formData.features.split('\n').filter(f => f.trim())) : null,
    };

    try {
      if (editingProduct) {
        await productAPI.update(editingProduct.id, productData);
      } else {
        await productAPI.create(productData);
      }
      
      setShowForm(false);
      setEditingProduct(null);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description || '',
      price: product.price.toString(),
      category: product.category || '',
      image_url: product.image_url || '',
      features: product.features ? JSON.parse(product.features).join('\n') : '',
      is_featured: product.is_featured,
      is_available: product.is_available,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await productAPI.delete(id);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      category: '',
      image_url: '',
      features: '',
      is_featured: false,
      is_available: true,
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <Button variant="ghost" icon={<FaArrowLeft />} onClick={() => router.push('/admin')}>
              Back
            </Button>
            <div>
              <h1 className="text-4xl font-bold">
                Manage <span className="gradient-text">Products</span>
              </h1>
            </div>
          </div>
          
          {!showForm && (
            <Button variant="primary" icon={<FaPlus />} onClick={() => setShowForm(true)}>
              Add Product
            </Button>
          )}
        </div>

        {/* Product Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Card>
              <h2 className="text-2xl font-bold mb-6">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Title *</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Price *</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Category</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., E-commerce, Portfolio, Landing Page"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <TextArea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Features (one per line)
                  </label>
                  <TextArea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder="Responsive Design&#10;SEO Optimized&#10;Fast Loading"
                    rows={5}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Product Image</label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button
                        type="button"
                        variant="secondary"
                        icon={<FaUpload />}
                        onClick={() => document.getElementById('file-upload').click()}
                        disabled={uploading}
                      >
                        {uploading ? 'Uploading...' : 'Upload Image'}
                      </Button>
                    </label>
                    {formData.image_url && (
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                        <Image src={formData.image_url} alt="Preview" fill className="object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="w-5 h-5"
                    />
                    <span>Featured Product</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_available}
                      onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                      className="w-5 h-5"
                    />
                    <span>Available for Purchase</span>
                  </label>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" variant="primary">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setShowForm(false);
                      setEditingProduct(null);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}

        {/* Products List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id}>
              {product.image_url && (
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image src={product.image_url} alt={product.title} fill className="object-cover" />
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-2">{product.title}</h3>
              <p className="text-gray-400 mb-4 line-clamp-2">{product.description}</p>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold gradient-text">${product.price}</span>
                {product.is_featured && (
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                    Featured
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="secondary" icon={<FaEdit />} onClick={() => handleEdit(product)}>
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  icon={<FaTrash />}
                  onClick={() => handleDelete(product.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {products.length === 0 && !showForm && (
          <Card>
            <div className="text-center py-12">
              <p className="text-xl text-gray-400 mb-6">No products yet</p>
              <Button variant="primary" icon={<FaPlus />} onClick={() => setShowForm(true)}>
                Add Your First Product
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
