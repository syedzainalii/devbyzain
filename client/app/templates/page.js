'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaFilter } from 'react-icons/fa';
import Card from '@/components/Card';
import Loading from '@/components/Loading';
import { productAPI } from '@/lib/api';
import { normalizeImageUrl } from '@/lib/imageHelper';

export default function Templates() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [categories, setCategories] = useState(['all']);

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Website <span className="gradient-text">Templates</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Professional, ready-to-use website designs. Choose your perfect template and get started today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      {categories.length > 1 && (
        <section className="container-custom mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-4 justify-center items-center"
          >
            <FaFilter className="text-gray-400" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  filter === category
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {category === 'all' ? 'All Templates' : category}
              </button>
            ))}
          </motion.div>
        </section>
      )}

      {/* Templates Grid */}
      <section className="container-custom pb-20">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No templates found</p>
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
                <Link href={`/templates/${product.id}`}>
                  <Card hover={true} className="h-full flex flex-col group">
                    {/* Product Image */}
                    <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden">
                      {product.image_url ? (
                        <Image
                          src={normalizeImageUrl(product.image_url)}
                          alt={product.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                          <span className="text-white text-4xl font-bold">
                            {product.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      
                      {/* Price Badge */}
                      <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                        <span className="text-xl font-bold gradient-text">
                          {(() => {
                            try {
                              const tierSystem = product.tier_system ? JSON.parse(product.tier_system) : null;
                              const basicPrice = tierSystem?.basic?.price;
                              if (basicPrice) {
                                return `From Rs ${basicPrice}`;
                              }
                            } catch (e) {
                              console.error('Error parsing tier_system:', e);
                            }
                            return `Rs ${product.price}`;
                          })()}
                        </span>
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
                        <span className="text-purple-400 text-sm font-semibold uppercase mb-2">
                          {product.category}
                        </span>
                      )}
                      
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                        {product.title}
                      </h3>
                      
                      {product.description && (
                        <p className="text-gray-400 mb-4 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      <div className="mt-auto pt-4">
                        <span className="text-purple-400 font-semibold group-hover:text-purple-300">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
