'use client';
import { motion } from 'framer-motion';
import { FaRocket, FaCode, FaPalette, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import Button from '@/components/Button';
import Card from '@/components/Card';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding min-h-[90vh] flex items-center">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Welcome to the
                <span className="gradient-text block animate-glow">
                  Next Generation
                </span>
                of Web Design
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Transform your digital presence with cutting-edge designs and custom web solutions.
                We create exceptional experiences that captivate and convert.
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Link href="/portfolio">
                  <Button variant="primary" icon={<FaRocket />}>
                    View Portfolio
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="secondary">
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Animated Graphics */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full h-[500px]">
                {/* Floating Cards */}
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-0 right-0 glass-card p-6 w-64"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg mb-4"></div>
                  <div className="h-4 bg-white/20 rounded mb-2"></div>
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute bottom-0 left-0 glass-card p-6 w-64"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg mb-4"></div>
                  <div className="h-4 bg-white/20 rounded mb-2"></div>
                  <div className="h-4 bg-white/10 rounded w-2/3"></div>
                </motion.div>

                {/* Center Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive solutions tailored to your unique needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card delay={0.1}>
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <FaPalette className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Pre-Made Designs</h3>
              <p className="text-gray-400 mb-6">
                Choose from our collection of stunning, ready-to-use web designs.
                Perfect for quick deployment with professional quality.
              </p>
              <Link href="/portfolio">
                <Button variant="ghost" icon={<FaArrowRight />}>
                  Browse Designs
                </Button>
              </Link>
            </Card>

            <Card delay={0.2}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <FaCode className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Custom Development</h3>
              <p className="text-gray-400 mb-6">
                Bespoke web solutions built from the ground up to match your exact
                specifications and brand identity.
              </p>
              <Link href="/services">
                <Button variant="ghost" icon={<FaArrowRight />}>
                  Request Custom
                </Button>
              </Link>
            </Card>

            <Card delay={0.3}>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <FaRocket className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Design Customization</h3>
              <p className="text-gray-400 mb-6">
                Modify existing designs to perfectly fit your needs. Get the best
                of both worlds with our customization service.
              </p>
              <Link href="/portfolio">
                <Button variant="ghost" icon={<FaArrowRight />}>
                  Get Started
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass-card p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-5xl font-bold gradient-text mb-2">100+</h3>
                <p className="text-gray-400">Projects Completed</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-5xl font-bold gradient-text mb-2">50+</h3>
                <p className="text-gray-400">Happy Clients</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-5xl font-bold gradient-text mb-2">5+</h3>
                <p className="text-gray-400">Years Experience</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-5xl font-bold gradient-text mb-2">24/7</h3>
                <p className="text-gray-400">Support Available</p>
              </motion.div>
            </div>
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
              Ready to Start Your <span className="gradient-text">Next Project?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's bring your vision to life with cutting-edge technology and stunning design.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/portfolio">
                <Button variant="primary">View Our Work</Button>
              </Link>
              <Link href="/services">
                <Button variant="secondary">Request a Quote</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
