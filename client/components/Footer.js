'use client';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaShoppingCart, FaPaintBrush } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-card mt-20 border-t border-white/10">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <h3 className="text-2xl font-bold gradient-text">DevbyZain</h3>
            </div>
            <p className="text-gray-400">
              Professional website templates and custom design services for your business.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/custom" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Custom Design
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-purple-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">What We Offer</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400">
                <FaShoppingCart className="text-purple-400" />
                Website Templates
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <FaPaintBrush className="text-purple-400" />
                Custom Design
              </li>
              <li className="text-gray-400">React & Next.js</li>
              <li className="text-gray-400">Responsive Design</li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-xl">
                <FaGithub />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-xl">
                <FaLinkedin />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-xl">
                <FaTwitter />
              </a>
              <a href="mailto:contact@devbyzain.com" className="text-gray-400 hover:text-purple-400 transition-colors text-xl">
                <FaEnvelope />
              </a>
            </div>
            <p className="text-sm text-gray-400">
              <a href="mailto:contact@devbyzain.com" className="hover:text-purple-400 transition-colors">
                contact@devbyzain.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} DevbyZain. All rights reserved. Built with React & Next.js</p>
        </div>
      </div>
    </footer>
  );
}
