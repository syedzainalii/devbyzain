'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

export default function Terms() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <ParticleBackground />
      <Navbar />
      
      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-purple-500/20">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            
            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using this website, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to these terms, please do not 
                  use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Use of Service</h2>
                <p>
                  You agree to use this service only for lawful purposes and in a way that does not 
                  infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>
                <p>
                  When you create an account, you are responsible for:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                  <li>Maintaining the security of your account</li>
                  <li>All activities that occur under your account</li>
                  <li>Providing accurate and complete information</li>
                  <li>Updating your information to keep it current</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Orders and Payment</h2>
                <p>
                  All orders placed through our service are subject to acceptance and availability. 
                  We reserve the right to refuse any order for any reason. Prices are subject to change 
                  without notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Intellectual Property</h2>
                <p>
                  The content, design, graphics, and other materials on this website are protected by 
                  copyright and other intellectual property rights. You may not reproduce, distribute, 
                  or create derivative works without our explicit permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
                <p>
                  We shall not be liable for any indirect, incidental, special, consequential, or 
                  punitive damages resulting from your use of or inability to use the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. We will notify you of any 
                  changes by posting the new terms on this page. Your continued use of the service 
                  after such changes constitutes your acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us at{' '}
                  <a href="mailto:legal@example.com" className="text-purple-400 hover:text-purple-300">
                    legal@example.com
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
