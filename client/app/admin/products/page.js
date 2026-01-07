'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaUpload, FaExternalLinkAlt } from 'react-icons/fa';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input, { TextArea } from '@/components/Input';
import Loading from '@/components/Loading';
import { productAPI, uploadAPI } from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import Image from 'next/image';
import { normalizeImageUrl } from '@/lib/imageHelper';

export default function AdminProducts() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '0', // Default to 0 since we're using tier pricing
    category: '',
    image_url: '',
    preview_url: '',
    features: '',
    is_featured: false,
    is_available: true,
    tier_system: {
      basic: { price: '', services: '', delivery_time: '' },
      standard: { price: '', services: '', delivery_time: '' },
      premium: { price: '', services: '', delivery_time: '' }
    }
  });

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        router.push('/admin');
        return;
      }
      fetchProducts();
    };
    
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleAdditionalImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map(file => uploadAPI.upload(file));
      const responses = await Promise.all(uploadPromises);
      const newImageUrls = responses.map(res => res.data.url);
      setAdditionalImages([...additionalImages, ...newImageUrls]);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload some files');
    } finally {
      setUploading(false);
    }
  };

  const removeAdditionalImage = (index) => {
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      features: formData.features ? JSON.stringify(formData.features.split('\n').filter(f => f.trim())) : null,
      additional_images: additionalImages.length > 0 ? JSON.stringify(additionalImages) : null,
      tier_system: JSON.stringify(formData.tier_system)
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
      setAdditionalImages([]);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    
    let tierSystem = {
      basic: { price: '', services: '', delivery_time: '' },
      standard: { price: '', services: '', delivery_time: '' },
      premium: { price: '', services: '', delivery_time: '' }
    };
    
    if (product.tier_system) {
      try {
        tierSystem = JSON.parse(product.tier_system);
      } catch (e) {
        console.error('Error parsing tier_system:', e);
      }
    }
    
    setFormData({
      title: product.title,
      description: product.description || '',
      price: product.price.toString(),
      category: product.category || '',
      image_url: product.image_url || '',
      preview_url: product.preview_url || '',
      features: product.features ? JSON.parse(product.features).join('\n') : '',
      is_featured: product.is_featured,
      is_available: product.is_available,
      tier_system: tierSystem
    });
    
    if (product.additional_images) {
      try {
        setAdditionalImages(JSON.parse(product.additional_images));
      } catch (e) {
        console.error('Error parsing additional_images:', e);
        setAdditionalImages([]);
      }
    } else {
      setAdditionalImages([]);
    }
    
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
      preview_url: '',
      features: '',
      is_featured: false,
      is_available: true,
      tier_system: {
        basic: { price: '', services: '', delivery_time: '' },
        standard: { price: '', services: '', delivery_time: '' },
        premium: { price: '', services: '', delivery_time: '' }
      }
    });
    setAdditionalImages([]);
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
                <div>
                  <label className="block text-sm font-semibold mb-2">Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
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
                  <label className="block text-sm font-semibold mb-2">Preview URL</label>
                  <Input
                    type="url"
                    value={formData.preview_url}
                    onChange={(e) => setFormData({ ...formData, preview_url: e.target.value })}
                    placeholder="https://example.com/preview"
                  />
                  <p className="text-sm text-gray-400 mt-1">Live demo or preview link for this template</p>
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
                  <label className="block text-sm font-semibold mb-2">Main Product Image</label>
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
                        <Image src={normalizeImageUrl(formData.image_url)} alt="Preview" fill className="object-cover" unoptimized />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Additional Images</label>
                  <div className="space-y-4">
                    <input
                      type="file"
                      onChange={handleAdditionalImageUpload}
                      accept="image/*"
                      multiple
                      className="hidden"
                      id="additional-file-upload"
                    />
                    <label htmlFor="additional-file-upload">
                      <Button
                        type="button"
                        variant="secondary"
                        icon={<FaUpload />}
                        onClick={() => document.getElementById('additional-file-upload').click()}
                        disabled={uploading}
                      >
                        {uploading ? 'Uploading...' : 'Upload Multiple Images'}
                      </Button>
                    </label>
                    {additionalImages.length > 0 && (
                      <div className="grid grid-cols-4 gap-4">
                        {additionalImages.map((imgUrl, index) => (
                          <div key={index} className="relative group">
                            <div className="relative w-full h-20 rounded-lg overflow-hidden">
                              <Image src={normalizeImageUrl(imgUrl)} alt={`Additional ${index + 1}`} fill className="object-cover" unoptimized />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeAdditionalImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6 p-6 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-xl font-bold gradient-text">Tier Pricing System *</h3>
                  <p className="text-sm text-gray-400">Configure pricing tiers for this template. Set prices, services, and delivery times for each tier.</p>
                  
                  {['basic', 'standard', 'premium'].map((tier) => (
                    <div key={tier} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <h4 className="text-lg font-semibold capitalize mb-4 text-purple-400">{tier} Tier</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Price ($)</label>
                          <Input
                            type="number"
                            step="0.01"
                            value={formData.tier_system[tier].price}
                            onChange={(e) => setFormData({
                              ...formData,
                              tier_system: {
                                ...formData.tier_system,
                                [tier]: { ...formData.tier_system[tier], price: e.target.value }
                              }
                            })}
                            placeholder="99.00"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Services Included</label>
                          <Input
                            value={formData.tier_system[tier].services}
                            onChange={(e) => setFormData({
                              ...formData,
                              tier_system: {
                                ...formData.tier_system,
                                [tier]: { ...formData.tier_system[tier], services: e.target.value }
                              }
                            })}
                            placeholder="Basic setup, 3 pages"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Delivery Time</label>
                          <Input
                            value={formData.tier_system[tier].delivery_time}
                            onChange={(e) => setFormData({
                              ...formData,
                              tier_system: {
                                ...formData.tier_system,
                                [tier]: { ...formData.tier_system[tier], delivery_time: e.target.value }
                              }
                            })}
                            placeholder="3-5 days"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
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
                  <Image src={normalizeImageUrl(product.image_url)} alt={product.title} fill className="object-cover" unoptimized />
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
                {product.preview_url && (
                  <Button 
                    variant="primary" 
                    icon={<FaExternalLinkAlt />} 
                    onClick={() => window.open(product.preview_url, '_blank')}
                  >
                    Preview
                  </Button>
                )}
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
