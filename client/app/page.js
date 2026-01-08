'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaShoppingCart, FaCode, FaPaintBrush, FaArrowRight, FaCheck, FaRocket, FaLightbulb, FaStar, FaDownload, FaPlay } from 'react-icons/fa';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Interactive Cursor Trail */}
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-purple-500/30 pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Hero Section - Immersive 3D */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        {/* 3D Floating Elements - Optimized for mobile */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0"
        >
          <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-64 sm:h-64 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-56 h-56 sm:w-96 sm:h-96 bg-indigo-500/20 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-1/4 left-1/2 w-48 h-48 sm:w-80 sm:h-80 bg-pink-500/20 rounded-full blur-3xl animate-float-slow"></div>
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-20">
          <div className="max-w-7xl mx-auto">
            {/* Innovative Split Layout */}
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* Left: Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30 backdrop-blur-xl mb-6 sm:mb-8"
                >
                  <div className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-purple-500"></span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
                    Next-Gen Web Design Platform
                  </span>
                </motion.div>

                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 leading-[0.95]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="block">Design.</span>
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 text-transparent bg-clip-text animate-gradient">
                    Deploy.
                  </span>
                  <span className="block">Dominate.</span>
                </motion.h1>
                
                <motion.p 
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Skip the months of development. Launch your stunning website in hours with our battle-tested templates or go fully custom.
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link href="/templates" className="w-full sm:w-auto">
                    <button className="group relative w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-5 bg-white text-slate-900 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg overflow-hidden shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 active:scale-95 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 group-hover:text-white transition-colors">
                        <FaShoppingCart className="group-hover:rotate-12 transition-transform text-base sm:text-lg" />
                        Explore Templates
                        <FaArrowRight className="group-hover:translate-x-2 transition-transform text-sm sm:text-base" />
                      </span>
                    </button>
                  </Link>
                  <Link href="/custom" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-5 bg-white/5 border-2 border-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 hover:bg-white/10 hover:border-white/40 active:scale-95 transition-all duration-300">
                      <FaPlay className="text-purple-400 text-base sm:text-lg" />
                      Custom Design
                    </button>
                  </Link>
                </motion.div>

                {/* Minimal Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-wrap gap-6 sm:gap-8 text-sm"
                >
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">50+</div>
                    <div className="text-gray-500 text-xs sm:text-sm">Templates</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">500+</div>
                    <div className="text-gray-500 text-xs sm:text-sm">Happy Clients</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">4.9★</div>
                    <div className="text-gray-500 text-xs sm:text-sm">Rating</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right: Interactive Visual */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative hidden lg:block"
              >
                <div className="relative w-full aspect-square">
                  {/* Rotating Circle Design */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <div className="absolute top-0 left-1/2 w-4 h-4 -ml-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>
                    <div className="absolute top-1/2 right-0 w-4 h-4 -mt-2 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50"></div>
                    <div className="absolute bottom-0 left-1/2 w-4 h-4 -ml-2 bg-pink-500 rounded-full shadow-lg shadow-pink-500/50"></div>
                    <div className="absolute top-1/2 left-0 w-4 h-4 -mt-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                  </motion.div>

                  {/* Center Glow */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-48 h-48 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full blur-3xl opacity-40"
                    ></motion.div>
                  </div>

                  {/* Floating Cards */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-1/4 -left-12 bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                        <FaCheck className="text-white text-xl" />
                      </div>
                      <div>
                        <div className="font-bold">Live Preview</div>
                        <div className="text-xs text-gray-400">Test before buy</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-1/4 -right-12 bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                        <FaRocket className="text-white text-xl" />
                      </div>
                      <div>
                        <div className="font-bold">Fast Deploy</div>
                        <div className="text-xs text-gray-400">Launch in hours</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scrolling Templates Showcase */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-transparent to-purple-900/25 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              Browse <span className="gradient-text">Templates</span>
            </h2>
            <p className="text-xl text-gray-400">Swipe to explore our collection</p>
          </motion.div>
        </div>

        <div className="overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-6"
          >
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[400px] h-[500px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-white/10 p-6 hover:border-purple-500/50 transition-all duration-300">
                <div className="w-full h-48 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl mb-4 flex items-center justify-center">
                  <span className="text-6xl font-black opacity-20">{i + 1}</span>
                </div>
                <div className="space-y-3">
                  <div className="h-6 bg-white/5 rounded-lg w-3/4"></div>
                  <div className="h-4 bg-white/5 rounded-lg w-full"></div>
                  <div className="h-4 bg-white/5 rounded-lg w-2/3"></div>
                  <div className="flex gap-2 mt-4">
                    <div className="h-10 bg-purple-500/20 rounded-lg flex-1"></div>
                    <div className="h-10 bg-white/5 rounded-lg w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="text-center mt-12">
          <Link href="/templates">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/50">
              View All Templates
            </button>
          </Link>
        </div>
      </section>

      {/* Interactive Service Cards */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Two Ways to <span className="gradient-text">Win</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Templates Card - Interactive */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="relative group cursor-pointer"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-10 h-full">
                <div className="absolute top-6 right-6 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full text-green-400 text-sm font-bold">
                  POPULAR
                </div>
                
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
                  <FaShoppingCart className="text-3xl text-white" />
                </div>

                <h3 className="text-4xl font-black mb-4">Ready Templates</h3>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Instant access to premium designs. Download, customize, and launch your website today.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    'Instant download & setup',
                    '100% source code included',
                    'Lifetime updates',
                    'Documentation & support'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <FaCheck className="text-purple-400 text-xs" />
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-5xl font-black gradient-text">Rs 1000</span>
                  <span className="text-gray-500">starting from</span>
                </div>

                <Link href="/templates">
                  <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300">
                    Browse Templates
                    <FaArrowRight />
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Custom Card - Interactive */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative group cursor-pointer"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-10 h-full">
                <div className="absolute top-6 right-6 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-400 text-sm font-bold">
                  PREMIUM
                </div>
                
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
                  <FaCode className="text-3xl text-white" />
                </div>

                <h3 className="text-4xl font-black mb-4">Custom Build</h3>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Unique designs crafted specifically for your brand. Built from scratch by expert developers.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    'Fully custom design',
                    'Latest tech stack',
                    'SEO & performance optimized',
                    'Dedicated support'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                        <FaCheck className="text-pink-400 text-xs" />
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-5xl font-black gradient-text">Rs 1500</span>
                  <span className="text-gray-500">starting from</span>
                </div>

                <Link href="/custom">
                  <button className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300">
                    Get Custom Quote
                    <FaArrowRight />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Marquee */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-transparent to-purple-900/10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            Loved by <span className="gradient-text">Creators</span>
          </h2>
        </motion.div>

        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-6"
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-[400px] bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                <div>
                  <div className="font-bold">John Doe</div>
                  <div className="text-sm text-gray-400">Founder @ StartupXYZ</div>
                </div>
              </div>
              <div className="text-yellow-400 mb-2">★★★★★</div>
              <p className="text-gray-300">"Amazing templates! Saved us weeks of development time and looks absolutely stunning."</p>
            </div>
          ))}
        </motion.div>
      </section>


      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        .animate-float {
          animation: float 8s infinite;
        }
        .animate-float-delayed {
          animation: float 10s infinite;
          animation-delay: 2s;
        }
        .animate-float-slow {
          animation: float 12s infinite;
          animation-delay: 4s;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px);
          background-size: 4rem 4rem;
        }
      `}</style>
    </div>
  );
} 