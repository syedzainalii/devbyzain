'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { productAPI } from '@/lib/api';

export default function Portfolio() {
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
    <div className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our collection of stunning pre-made web designs. Each template is crafted with attention
            to detail and modern best practices.
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
                <Card hover={true} className="h-full flex flex-col">
                  {/* Product Image */}
                  <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">
                          {product.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    
                    {product.is_featured && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
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
                    
                    <p className="text-gray-400 mb-4 flex-1">
                      {product.description?.substring(0, 100)}
                      {product.description?.length > 100 ? '...' : ''}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-3xl font-bold gradient-text">
                        ${product.price}
                      </span>
                      
                      <div className="flex gap-2">
                        <Link href={`/portfolio/${product.id}`}>
                          <Button variant="secondary" icon={<FaEye />}>
                            View
                          </Button>
                        </Link>
                      </div>
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
          <Link href="/services">
            <Button variant="primary">Request Custom Design</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
