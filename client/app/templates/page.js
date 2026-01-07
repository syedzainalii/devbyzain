'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart, FaEye, FaExternalLinkAlt } from 'react-icons/fa';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { productAPI } from '@/lib/api';
import { normalizeImageUrl } from '@/lib/imageHelper';

export default function Templates() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [categories, setCategories] = useState(['all']);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data);
      
      // Extract unique categories
      const uniqueCategories = ['all', ...new Set(response.data.map(p => p.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  if (loading) return <Loading />;

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Website Templates For Sale
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Browse our collection of professional website designs. Purchase and download instantly to use for your business or project.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 capitalize ${
                filter === category
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                  : 'glass-card text-gray-300 hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  hover={true} 
                  className="h-full flex flex-col"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => {
                    setHoveredProduct(null);
                    setCurrentImageIndex({ ...currentImageIndex, [product.id]: 0 });
                  }}
                >
                  {/* Product Image */}
                  <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden group">
                    {product.image_url ? (
                      <>
                        <Image
                          src={normalizeImageUrl(
                            (() => {
                              const additionalImages = product.additional_images 
                                ? JSON.parse(product.additional_images) 
                                : [];
                              const allImages = [product.image_url, ...additionalImages];
                              const imgIndex = currentImageIndex[product.id] || 0;
                              return allImages[imgIndex] || product.image_url;
                            })()
                          )}
                          alt={product.title}
                          fill
                          className={`object-cover transition-all duration-300 ${
                            hoveredProduct === product.id ? 'scale-110' : 'scale-100'
                          }`}
                          unoptimized={!normalizeImageUrl(product.image_url)?.startsWith('https://devbyzain-backend.vercel.app')}
                        />
                        
                        {/* Image Navigation Dots */}
                        {product.additional_images && JSON.parse(product.additional_images).length > 0 && (
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                const additionalImages = JSON.parse(product.additional_images);
                                const allImages = [product.image_url, ...additionalImages];
                                const currentIndex = currentImageIndex[product.id] || 0;
                                const newIndex = currentIndex > 0 ? currentIndex - 1 : allImages.length - 1;
                                setCurrentImageIndex({ ...currentImageIndex, [product.id]: newIndex });
                              }}
                              className="bg-black/70 hover:bg-black/90 text-white rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-sm"
                            >
                              ‹
                            </button>
                            {[product.image_url, ...JSON.parse(product.additional_images)].map((_, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentImageIndex({ ...currentImageIndex, [product.id]: idx });
                                }}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  (currentImageIndex[product.id] || 0) === idx 
                                    ? 'bg-white w-6' 
                                    : 'bg-white/50'
                                }`}
                              />
                            ))}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                const additionalImages = JSON.parse(product.additional_images);
                                const allImages = [product.image_url, ...additionalImages];
                                const currentIndex = currentImageIndex[product.id] || 0;
                                const newIndex = (currentIndex + 1) % allImages.length;
                                setCurrentImageIndex({ ...currentImageIndex, [product.id]: newIndex });
                              }}
                              className="bg-black/70 hover:bg-black/90 text-white rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-sm"
                            >
                              ›
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">
                          {product.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                      {(() => {
                        try {
                          const tierSystem = product.tier_system ? JSON.parse(product.tier_system) : null;
                          const basicPrice = tierSystem?.basic?.price;
                          if (basicPrice) {
                            return (
                              <span className="text-xl font-bold gradient-text">
                                From ${basicPrice}
                              </span>
                            );
                          }
                        } catch (e) {
                          console.error('Error parsing tier_system:', e);
                        }
                        return (
                          <span className="text-2xl font-bold gradient-text">
                            ${product.price}
                          </span>
                        );
                      })()}
                    </div>
                    
                    {product.is_featured && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col">
                    {product.category && (
                      <span className="text-purple-400 text-sm font-semibold mb-2 uppercase">
                        {product.category}
                      </span>
                    )}
                    
                    <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
                    
                    <p className="text-gray-400 mb-6 flex-1">
                      {product.description?.substring(0, 100)}
                      {product.description?.length > 100 ? '...' : ''}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                      {product.preview_url && (
                        <Button 
                          variant="ghost" 
                          icon={<FaExternalLinkAlt />}
                          onClick={() => window.open(product.preview_url, '_blank')}
                          className="flex-1"
                        >
                          Preview
                        </Button>
                      )}
                      <Link href={`/templates/${product.id}`} className="flex-1">
                        <Button variant="primary" icon={<FaEye />} className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 glass-card p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't See What You're Looking For?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            We offer custom design services tailored to your specific needs and brand identity.
          </p>
          <Link href="/custom">
            <Button variant="primary">Request Custom Design</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
