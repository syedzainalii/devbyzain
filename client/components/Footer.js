'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaShoppingCart, FaPaintBrush, FaArrowRight, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Templates', href: '/templates' },
    { name: 'Custom Design', href: '/custom' },
    { name: 'About Us', href: '/about' },
  ];

  const services = [
    { icon: <FaShoppingCart />, name: 'Website Templates' },
    { icon: <FaPaintBrush />, name: 'Custom Design' },
    { icon: <FaShoppingCart />, name: 'React & Next.js' },
    { icon: <FaPaintBrush />, name: 'Responsive Design' },
  ];

  const socialLinks = [
    { icon: <FaGithub />, href: '#', color: 'hover:text-purple-400' },
    { icon: <FaLinkedin />, href: '#', color: 'hover:text-blue-400' },
    { icon: <FaTwitter />, href: '#', color: 'hover:text-sky-400' },
    { icon: <FaEnvelope />, href: 'mailto:contact@devbyzain.com', color: 'hover:text-pink-400' },
  ];

  return (
    <footer className="relative mt-32 overflow-hidden">
      {/* Decorative Top Wave */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

      <div className="relative">
        

        {/* Main Footer Content */}
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/">
                <motion.div 
                  className="flex items-center gap-3 mb-6 group"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="relative w-14 h-14 rounded-2xl overflow-hidden"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-black text-2xl">D</span>
                    </div>
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                      DevbyZain
                    </h3>
                    <p className="text-xs text-gray-500 font-bold">Digital Studio</p>
                  </div>
                </motion.div>
              </Link>
              <p className="text-gray-400 leading-relaxed mb-6">
                Crafting premium digital experiences that transform businesses and delight users.
              </p>
              
              {/* Social Links - Enhanced */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 ${social.color} transition-all hover:border-white/20 hover:bg-white/10`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg font-black mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href}>
                      <motion.div
                        className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-1 h-1 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        {link.name}
                      </motion.div>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-lg font-black mb-6 text-white">What We Offer</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-400 group">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/30 transition-all">
                      {service.icon}
                    </div>
                    <span className="group-hover:text-white transition-colors">{service.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-lg font-black mb-6 text-white">Get in Touch</h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="mailto:contact@devbyzain.com" 
                    className="flex items-start gap-3 text-gray-400 hover:text-purple-400 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/30 transition-all flex-shrink-0 mt-0.5">
                      <FaEnvelope className="text-sm" />
                    </div>
                    <span className="break-all">contact@devbyzain.com</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+923002678500" 
                    className="flex items-start gap-3 text-gray-400 hover:text-purple-400 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/30 transition-all flex-shrink-0 mt-0.5">
                      <FaPhone className="text-sm" />
                    </div>
                    <span>+92 300 2678500</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 flex-shrink-0 mt-0.5">
                    <FaMapMarkerAlt className="text-sm" />
                  </div>
                  <span>Karachi, Pakistan</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container-custom py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <motion.p 
                className="text-gray-400 text-sm text-center md:text-left"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                &copy; {currentYear} DevbyZain. All rights reserved. Built with React & Next.js
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-sm text-gray-400"
              >
                Made with <FaHeart className="text-red-500 animate-pulse" /> by DevbyZain
              </motion.div>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600"></div>
      </div>
    </footer>
  );
}