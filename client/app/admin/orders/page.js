'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaEye } from 'react-icons/fa';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { orderAPI } from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';

export default function AdminOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin');
      return;
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await orderAPI.update(orderId, { status });
      fetchOrders();
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="flex items-center gap-4 mb-12">
          <Button variant="ghost" icon={<FaArrowLeft />} onClick={() => router.push('/admin')}>
            Back
          </Button>
          <h1 className="text-4xl font-bold">
            Customer <span className="gradient-text">Orders</span>
          </h1>
        </div>

        {orders.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No orders yet</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-xl font-bold">Order #{order.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                        order.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-400">Customer</p>
                        <p className="font-semibold">{order.customer_name}</p>
                        <p className="text-gray-300">{order.customer_email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Order Type</p>
                        <p className="font-semibold capitalize">{order.order_type}</p>
                        <p className="text-gray-300">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {order.customization_details && (
                      <div className="glass-card p-4 rounded-xl mb-4">
                        <p className="text-sm text-gray-400 mb-2">Customization Details:</p>
                        <p className="text-gray-300">{order.customization_details}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      variant="secondary"
                      icon={<FaEye />}
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </Button>
                    
                    {order.status === 'pending' && (
                      <Button
                        variant="primary"
                        onClick={() => updateOrderStatus(order.id, 'processing')}
                      >
                        Process
                      </Button>
                    )}
                    
                    {order.status === 'processing' && (
                      <Button
                        variant="primary"
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
