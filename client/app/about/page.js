'use client';
import { motion } from 'framer-motion';
import { FaCode, FaPaintBrush, FaShoppingCart, FaCheck } from 'react-icons/fa';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Link from 'next/link';


export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                About Our Website Shop
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                We specialize in creating and selling professional website designs that help businesses 
                establish a strong online presence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What We Do
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We create professional websites and offer them for sale, along with custom design services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card delay={0.1}>
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <FaShoppingCart className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Sell Website Templates</h3>
              <p className="text-gray-400 text-lg">
                We design and sell ready-made website templates that you can purchase and use immediately 
                for your business or project.
              </p>
            </Card>

            <Card delay={0.2}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <FaCode className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Custom Development</h3>
              <p className="text-gray-400 text-lg">
                Need something unique? We build custom websites tailored specifically to your requirements 
                and business goals.
              </p>
            </Card>

            <Card delay={0.3}>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <FaPaintBrush className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Professional Design</h3>
              <p className="text-gray-400 text-lg">
                Every website is designed with attention to detail, modern aesthetics, and user experience 
                in mind.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Buy From Us Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Buy From Us
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Quality You Can Trust</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <FaCheck className="text-green-400 text-xl mt-1 flex-shrink-0" />
                      <span className="text-gray-300 text-lg">Modern, professional designs that stand out</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCheck className="text-green-400 text-xl mt-1 flex-shrink-0" />
                      <span className="text-gray-300 text-lg">Clean, well-organized code structure</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCheck className="text-green-400 text-xl mt-1 flex-shrink-0" />
                      <span className="text-gray-300 text-lg">Fully responsive on all devices</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCheck className="text-green-400 text-xl mt-1 flex-shrink-0" />
                      <span className="text-gray-300 text-lg">Built with React and Next.js</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-6">Great Value</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <FaCheck className="text-green-400 text-xl mt-1 flex-shrink-0" />
                      <span className="text-gray-300 text-lg">Affordable pricing for everyone</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCheck className="text-green-400 text-xl mt-1 flex-shrink-0" />
                      <span className="text-gray-300 text-lg">Instant download after purchase</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCheck className="text-green-400 text-xl mt-1 flex-shrink-0" />
                      <span className="text-gray-300 text-lg">Full source code included</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCheck className="text-green-400 text-xl mt-1 flex-shrink-0" />
                      <span className="text-gray-300 text-lg">Easy to customize and modify</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Your Website?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Browse our collection or request a custom design made just for you
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/templates">
                <Button variant="primary" icon={<FaShoppingCart />}>
                  Shop Website Templates
                </Button>
              </Link>
              <Link href="/custom">
                <Button variant="secondary">
                  Request Custom Design
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
