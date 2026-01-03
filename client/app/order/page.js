'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import Button from '@/components/Button';
import Input, { TextArea } from '@/components/Input';
import Card from '@/components/Card';
import Loading from '@/components/Loading';
import { productAPI, orderAPI } from '@/lib/api';

function OrderForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get('product');
  const orderType = searchParams.get('type'); // 'purchase' or 'customization'

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    customization_details: '',
  });

  useEffect(() => {
    if (productId) {
      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getById(productId);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const orderData = {
        ...formData,
        product_id: productId ? parseInt(productId) : null,
        order_type: orderType || 'purchase',
        total_amount: product?.price || 0,
      };

      await orderAPI.create(orderData);
      setSuccess(true);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  if (success) {
    return (
      <div className="section-padding">
        <div className="container-custom max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center"
          >
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Order Submitted!</h1>
            <p className="text-xl text-gray-400 mb-8">
              Thank you for your order. We'll get back to you shortly via email.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="primary" onClick={() => router.push('/portfolio')}>
                Continue Shopping
              </Button>
              <Button variant="secondary" onClick={() => router.push('/')}>
                Go Home
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {orderType === 'customization' ? 'Request Customization' : 'Complete Your Order'}
          </h1>
          <p className="text-xl text-gray-400">
            Fill out the form below and we'll process your request
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Full Name *
                  </label>
                  <Input
                    name="customer_name"
                    placeholder="John Doe"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    name="customer_email"
                    placeholder="john@example.com"
                    value={formData.customer_email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="customer_phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.customer_phone}
                    onChange={handleChange}
                  />
                </div>

                {orderType === 'customization' && (
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Customization Details *
                    </label>
                    <TextArea
                      name="customization_details"
                      placeholder="Please describe the customizations you'd like..."
                      value={formData.customization_details}
                      onChange={handleChange}
                      rows={6}
                      required={orderType === 'customization'}
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Order'}
                </Button>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
              
              {product ? (
                <>
                  <div className="mb-6">
                    <p className="text-gray-400 mb-2">Product</p>
                    <p className="font-semibold">{product.title}</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-400 mb-2">Type</p>
                    <p className="font-semibold capitalize">
                      {orderType === 'customization' ? 'Customization Request' : 'Purchase'}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold">Total</span>
                      <span className="text-3xl font-bold gradient-text">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-400">No product selected</p>
              )}

              <div className="mt-6 p-4 glass-card rounded-xl">
                <p className="text-sm text-gray-400">
                  By submitting this form, you agree to our terms of service and privacy policy.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Order() {
  return (
    <Suspense fallback={<Loading />}>
      <OrderForm />
    </Suspense>
  );
}
