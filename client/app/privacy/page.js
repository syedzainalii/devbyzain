'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <ParticleBackground />
      <Navbar />
      
      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-purple-500/20">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            
            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
                <p>
                  We collect information you provide directly to us when you create an account, 
                  place an order, or communicate with us. This may include your name, email address, 
                  and any other information you choose to provide.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process your orders and send you related information</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
                <p>
                  We do not share your personal information with third parties except as described 
                  in this policy. We may share information with service providers who help us operate 
                  our business.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
                <p>
                  We take reasonable measures to help protect your personal information from loss, 
                  theft, misuse, unauthorized access, disclosure, alteration, and destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
                <p>
                  You have the right to access, update, or delete your personal information. 
                  You can do this by logging into your account or contacting us directly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at{' '}
                  <a href="mailto:privacy@example.com" className="text-purple-400 hover:text-purple-300">
                    privacy@example.com
                  </a>
                </p>
              </section>

              <section className="pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-400">
                  Last updated: {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
