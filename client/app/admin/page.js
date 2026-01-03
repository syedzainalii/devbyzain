'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaBox, FaShoppingBag, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Loading from '@/components/Loading';
import { authAPI } from '@/lib/api';
import { setToken, getToken, removeToken, isAuthenticated } from '@/lib/auth';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (isAuthenticated()) {
      try {
        await authAPI.getMe();
        setIsLoggedIn(true);
      } catch (error) {
        removeToken();
        setIsLoggedIn(false);
      }
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(loginData);
      setToken(response.data.access_token);
      setIsLoggedIn(true);
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    router.push('/');
  };

  if (loading) return <Loading />;

  // Login Form
  if (!isLoggedIn) {
    return (
      <div className="section-padding min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card>
            <h1 className="text-3xl font-bold mb-2 text-center">Admin Login</h1>
            <p className="text-gray-400 text-center mb-8">
              Sign in to access the admin dashboard
            </p>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-xl mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  placeholder="admin@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Sign In
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Admin <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-gray-400">Manage your portfolio and marketplace</p>
          </div>
          <Button variant="secondary" icon={<FaSignOutAlt />} onClick={handleLogout}>
            Logout
          </Button>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card hover onClick={() => router.push('/admin/products')}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl">
                <FaBox />
              </div>
              <div>
                <h3 className="text-xl font-bold">Manage Products</h3>
                <p className="text-gray-400">Add, edit, or delete products</p>
              </div>
            </div>
          </Card>

          <Card hover onClick={() => router.push('/admin/orders')}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl">
                <FaShoppingBag />
              </div>
              <div>
                <h3 className="text-xl font-bold">View Orders</h3>
                <p className="text-gray-400">Check customer orders</p>
              </div>
            </div>
          </Card>

          <Card hover onClick={() => router.push('/admin/requests')}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl">
                <FaEnvelope />
              </div>
              <div>
                <h3 className="text-xl font-bold">Custom Requests</h3>
                <p className="text-gray-400">Review project requests</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Welcome Card */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-gray-400 mb-6">
            Use the cards above to navigate to different sections of the admin panel.
            You can manage products, view orders, and review custom project requests.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-4 rounded-xl">
              <h4 className="font-semibold mb-2">Quick Tips</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Upload high-quality images for better conversions</li>
                <li>• Keep product descriptions clear and concise</li>
                <li>• Respond to custom requests within 24 hours</li>
              </ul>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <h4 className="font-semibold mb-2">Need Help?</h4>
              <p className="text-sm text-gray-400">
                Check out the documentation or contact support for assistance with
                managing your marketplace.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
