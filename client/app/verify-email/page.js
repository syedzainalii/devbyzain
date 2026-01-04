'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaEnvelope } from 'react-icons/fa';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Link from 'next/link';
import { Suspense } from 'react';

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get('email');
  
  const [email, setEmail] = useState(emailFromUrl || '');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resending, setResending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email,
          code: code
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        
        // Store token if provided
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        
        // Redirect after 2 seconds
        setTimeout(() => {
          if (data.user?.is_admin) {
            router.push('/admin');
          } else {
            router.push('/');
          }
        }, 2000);
      } else {
        setError(data.detail || 'Verification failed');
      }
    } catch (error) {
      setError('Failed to verify code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResending(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Verification code sent! Check your email.');
      } else {
        setError(data.detail || 'Failed to resend code');
      }
    } catch (error) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 max-w-md w-full"
      >
        {!success ? (
          <>
            <div className="text-center mb-8">
              <FaEnvelope className="text-6xl text-purple-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Verify Your Email</h1>
              <p className="text-gray-400">Enter the 6-digit code sent to your email</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400">
                  {error}
                </div>
              )}

              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />

              <Input
                label="Verification Code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                maxLength={6}
                required
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resending || !email}
                  className="text-purple-400 hover:text-purple-300 text-sm disabled:opacity-50"
                >
                  {resending ? 'Sending...' : "Didn't receive code? Resend"}
                </button>
              </div>

              <div className="text-center">
                <Link href="/login" className="text-gray-400 hover:text-white text-sm">
                  Back to Login
                </Link>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Email Verified!</h1>
            <p className="text-gray-400 mb-6">Your email has been successfully verified.</p>
            <p className="text-sm text-gray-500">Redirecting...</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-400">Loading...</div>
      </div>
    }>
      <VerifyEmailForm />
    </Suspense>
  );
}
