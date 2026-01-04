'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaBox, FaPaintBrush, FaClipboardList, FaSignOutAlt, FaEdit } from 'react-icons/fa';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and is admin
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (!token || !userData) {
        router.push('/login');
        return;
      }

      try {
        const parsedUser = JSON.parse(userData);
        if (!parsedUser.is_admin) {
          router.push('/');
          return;
        }

        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []); // Empty dependency array - only run once on mount

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="section-padding min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-5xl font-bold mb-4">
                Admin <span className="gradient-text">Dashboard</span>
              </h1>
              <p className="text-xl text-gray-400">
                Welcome back, {user?.name || 'Admin'}! Manage your website content here.
              </p>
            </div>
            <Button variant="secondary" icon={<FaSignOutAlt />} onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </motion.div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Manage Templates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/admin/products">
              <Card hover={true} className="h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                  <FaBox className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Manage Templates</h3>
                <p className="text-gray-400 mb-6">
                  Add, edit, or remove website templates from your shop.
                </p>
                <Button variant="ghost" icon={<FaEdit />}>
                  Go to Templates
                </Button>
              </Card>
            </Link>
          </motion.div>

          {/* All Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Link href="/admin/orders">
              <Card hover={true} className="h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                  <FaClipboardList className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">All Orders</h3>
                <p className="text-gray-400 mb-6">
                  View and manage template purchase orders.
                </p>
                <Button variant="ghost" icon={<FaEdit />}>
                  View Orders
                </Button>
              </Card>
            </Link>
          </motion.div>

          {/* Edit Custom Page */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/admin/custom-page">
              <Card hover={true} className="h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                  <FaPaintBrush className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Edit Custom Page</h3>
                <p className="text-gray-400 mb-6">
                  Customize your Custom Design page content.
                </p>
                <Button variant="ghost" icon={<FaEdit />}>
                  Edit Custom Page
                </Button>
              </Card>
            </Link>
          </motion.div>

          {/* View Custom Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Link href="/admin/requests">
              <Card hover={true} className="h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                  <FaEdit className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Custom Requests</h3>
                <p className="text-gray-400 mb-6">
                  View and manage custom design requests.
                </p>
                <Button variant="ghost" icon={<FaEdit />}>
                  View Requests
                </Button>
              </Card>
            </Link>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <Card>
            <h3 className="text-2xl font-bold mb-4">Quick Tips</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Use high-quality images (1200x800px recommended) for template previews</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Update your Custom Design page regularly to reflect new services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Respond to custom requests promptly to improve customer satisfaction</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Admin access is determined by the email set in your .env file</span>
              </li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
