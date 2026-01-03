'use client';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-card mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">NextGen</h3>
            <p className="text-gray-400">
              Creating exceptional digital experiences with cutting-edge technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Web Design</li>
              <li className="text-gray-400">Web Development</li>
              <li className="text-gray-400">Custom Solutions</li>
              <li className="text-gray-400">Consulting</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
                <FaGithub />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
                <FaLinkedin />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} NextGen Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
