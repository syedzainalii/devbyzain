'use client';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaCode, FaPaintBrush, FaArrowRight, FaCheck } from 'react-icons/fa';
import Link from 'next/link';
import Button from '@/components/Button';
import Card from '@/components/Card';

export default function Home() {
  return (
    <div className="relative">

      {/* Hero Section */}
      <section className="section-padding min-h-[90vh] flex items-center relative">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Buy Premium
                <span className="gradient-text block">Website Designs</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Professional, ready-to-use website templates and custom web design services for your business
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-4 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Link href="/templates">
                  <Button variant="primary" icon={<FaShoppingCart />}>
                    Browse Website Templates
                  </Button>
                </Link>
                <Link href="/custom">
                  <Button variant="secondary">
                    Request Custom Design
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What We Offer
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose from ready-made website designs or get a custom solution built just for you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card delay={0.1}>
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <FaShoppingCart className="text-3xl text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Pre-Made Website Templates</h3>
              <p className="text-gray-400 mb-6 text-lg">
                Browse our collection of professionally designed websites. Purchase and download instantly. 
                Perfect for startups, small businesses, and personal projects.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-300">
                  <FaCheck className="text-green-400" /> Instant download after purchase
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <FaCheck className="text-green-400" /> Full source code included
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <FaCheck className="text-green-400" /> Responsive & modern designs
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <FaCheck className="text-green-400" /> Easy to customize
                </li>
              </ul>
              <Link href="/templates">
                <Button variant="primary" icon={<FaArrowRight />} className="w-full">
                  View All Templates
                </Button>
              </Link>
            </Card>

            <Card delay={0.2}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <FaCode className="text-3xl text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Custom Web Development</h3>
              <p className="text-gray-400 mb-6 text-lg">
                Need something unique? We build custom websites from scratch tailored to your specific 
                requirements, brand identity, and business goals.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-300">
                  <FaCheck className="text-green-400" /> 100% custom design & code
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <FaCheck className="text-green-400" /> Built with latest technologies
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <FaCheck className="text-green-400" /> SEO optimized structure
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <FaCheck className="text-green-400" /> Ongoing support included
                </li>
              </ul>
              <Link href="/custom">
                <Button variant="primary" icon={<FaArrowRight />} className="w-full">
                  Get Custom Quote
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose Our Designs
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card delay={0.1}>
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <FaPaintBrush className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Modern & Professional</h3>
              <p className="text-gray-400 text-lg">
                All our designs follow the latest web design trends and best practices to ensure your website looks professional and modern.
              </p>
            </Card>

            <Card delay={0.2}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <FaCode className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Clean Code Quality</h3>
              <p className="text-gray-400 text-lg">
                Built with clean, well-documented code using React, Next.js, and modern frameworks. Easy to understand and customize.
              </p>
            </Card>

            <Card delay={0.3}>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <FaCheck className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Fully Responsive</h3>
              <p className="text-gray-400 text-lg">
                Every design is fully responsive and tested across all devices - desktop, tablet, and mobile phones.
              </p>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
}
