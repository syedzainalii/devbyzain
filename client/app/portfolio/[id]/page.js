'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaEdit, FaArrowLeft, FaCheck } from 'react-icons/fa';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Loading from '@/components/Loading';
import { productAPI } from '@/lib/api';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getById(params.id);
      setProduct(response.data);
      setSelectedImage(response.data.image_url);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  if (!product) {
    return (
      <div className="section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link href="/portfolio">
            <Button variant="primary">Back to Portfolio</Button>
          </Link>
        </div>
      </div>
    );
  }

  const additionalImages = product.additional_images 
    ? JSON.parse(product.additional_images) 
    : [];
  
  const features = product.features 
    ? JSON.parse(product.features) 
    : [];

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/portfolio">
            <Button variant="ghost" icon={<FaArrowLeft />}>
              Back to Portfolio
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden mb-4">
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-6xl font-bold">
                    {product.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {additionalImages.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                <div
                  onClick={() => setSelectedImage(product.image_url)}
                  className={`relative h-24 rounded-lg overflow-hidden cursor-pointer border-2 ${
                    selectedImage === product.image_url ? 'border-purple-500' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={product.image_url}
                    alt="Main"
                    fill
                    className="object-cover"
                  />
                </div>
                {additionalImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`relative h-24 rounded-lg overflow-hidden cursor-pointer border-2 ${
                      selectedImage === img ? 'border-purple-500' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {product.category && (
              <span className="text-purple-400 text-sm font-semibold uppercase mb-4 block">
                {product.category}
              </span>
            )}

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {product.title}
            </h1>

            {product.is_featured && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full mb-6">
                <span className="font-semibold">Featured Product</span>
              </div>
            )}

            <div className="text-5xl font-bold gradient-text mb-6">
              ${product.price}
            </div>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            {features.length > 0 && (
              <Card className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Features</h3>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Action Buttons */}
            {product.is_available ? (
              <div className="space-y-4">
                <Link href={`/order?product=${product.id}&type=purchase`}>
                  <Button 
                    variant="primary" 
                    className="w-full" 
                    icon={<FaShoppingCart />}
                  >
                    Buy Now - ${product.price}
                  </Button>
                </Link>
                
                <Link href={`/order?product=${product.id}&type=customization`}>
                  <Button 
                    variant="secondary" 
                    className="w-full" 
                    icon={<FaEdit />}
                  >
                    Request Customization
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="glass-card p-6 text-center">
                <p className="text-xl text-gray-400">
                  This product is currently unavailable
                </p>
              </div>
            )}

            {/* Additional Info */}
            <Card className="mt-8">
              <h3 className="text-xl font-bold mb-4">What's Included</h3>
              <ul className="space-y-2 text-gray-300">
                <li>✓ Full source code</li>
                <li>✓ Documentation</li>
                <li>✓ Free updates for 1 year</li>
                <li>✓ Email support</li>
                <li>✓ Lifetime license</li>
              </ul>
            </Card>
          </motion.div>
        </div>

        {/* Related Products Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            You May Also <span className="gradient-text">Like</span>
          </h2>
          <div className="text-center">
            <Link href="/portfolio">
              <Button variant="secondary">View All Products</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
