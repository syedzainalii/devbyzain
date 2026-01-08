'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      // TODO: Implement password reset API endpoint
      // For now, show a placeholder message
      setStatus('Password reset functionality is coming soon. Please contact the administrator.');
      setLoading(false);
    } catch (error) {
      setStatus('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <ParticleBackground />
      <Navbar />
      
      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-purple-500/20">
            <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Reset Password
            </h1>
            
            <p className="text-gray-400 mb-6 text-center">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
              />

              {status && (
                <div className={`p-4 rounded-lg ${
                  status.includes('error') || status.includes('try again')
                    ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                    : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                }`}>
                  {status}
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/login" className="text-sm text-purple-400 hover:text-purple-300">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
