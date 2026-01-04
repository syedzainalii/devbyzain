'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaShoppingCart, FaTachometerAlt, FaChevronDown } from 'react-icons/fa';
import { authAPI } from '@/lib/api';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for authenticated user
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else {
        setUser(null);
      }
    };
    
    checkAuth();
    
    // Listen for storage changes (login/logout in other tabs)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []); // Remove pathname dependency - only check auth once on mount

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    setShowUserMenu(false);
    router.push('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Templates', href: '/templates' },
    { name: 'Custom Design', href: '/custom' },
    { name: 'About Us', href: '/about' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass-card border-b border-white/10 shadow-lg shadow-purple-500/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
                <span className="text-white font-bold text-xl">W</span>
              </div>
              <h1 className="text-2xl font-bold gradient-text hidden sm:block">WebShop</h1>
            </motion.div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <motion.div
                  className={`relative px-5 py-2.5 rounded-xl font-semibold transition-all ${
                    pathname === link.href
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-purple-500/50'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.div>
              </Link>
            ))}
          </div>
            
          {/* Auth Buttons / User Menu - Right Corner */}
          <div className="hidden lg:flex items-center gap-2 ml-auto">
            {user ? (
              <div 
                className="relative"
                onMouseEnter={() => setShowUserMenu(true)}
                onMouseLeave={() => setShowUserMenu(false)}
              >
                <motion.button
                  className="px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/30 flex items-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaUser className="text-sm" />
                  <span>{user.name || user.email.split('@')[0]}</span>
                  <FaChevronDown className="text-xs" />
                </motion.button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 glass-card border border-white/10 rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="p-3 border-b border-white/10">
                        <p className="text-sm text-gray-400">Signed in as</p>
                        <p className="text-sm font-semibold text-white truncate">{user.email}</p>
                        {user.is_admin && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                            Admin
                          </span>
                        )}
                      </div>
                      
                      <div className="py-2">
                        {user.is_admin && (
                          <Link href="/admin">
                            <motion.button
                              className="w-full px-4 py-2.5 text-left text-gray-300 hover:bg-white/5 hover:text-white transition-all flex items-center gap-3"
                              whileHover={{ x: 5 }}
                              onClick={() => setShowUserMenu(false)}
                            >
                              <FaTachometerAlt className="text-purple-400" />
                              <span>Admin Dashboard</span>
                            </motion.button>
                          </Link>
                        )}
                        
                        <Link href="/order">
                          <motion.button
                            className="w-full px-4 py-2.5 text-left text-gray-300 hover:bg-white/5 hover:text-white transition-all flex items-center gap-3"
                            whileHover={{ x: 5 }}
                            onClick={() => setShowUserMenu(false)}
                          >
                            <FaShoppingCart className="text-blue-400" />
                            <span>My Orders</span>
                          </motion.button>
                        </Link>
                        
                        <div className="border-t border-white/10 my-2"></div>
                        
                        <motion.button
                          className="w-full px-4 py-2.5 text-left text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all flex items-center gap-3"
                          whileHover={{ x: 5 }}
                          onClick={handleLogout}
                        >
                          <FaSignOutAlt />
                          <span>Logout</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <motion.button
                    className="px-5 py-2.5 rounded-xl font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaUser className="text-sm" />
                    <span>Login</span>
                  </motion.button>
                </Link>
                <Link href="/signup">
                  <motion.button
                    className="px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/30"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden text-white text-2xl p-2 hover:bg-white/5 rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <motion.div
                      className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${
                        pathname === link.href
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                      onClick={() => setIsOpen(false)}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.name}
                    </motion.div>
                  </Link>
                ))}
                
                {/* Mobile Auth Buttons / User Menu */}
                <div className="pt-4 space-y-2 border-t border-white/10">
                  {user ? (
                    <>
                      <div className="px-4 py-3 glass-card rounded-xl border border-white/10">
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="text-sm font-semibold text-white truncate">{user.email}</p>
                        {user.is_admin && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                            Admin
                          </span>
                        )}
                      </div>
                      
                      {user.is_admin && (
                        <Link href="/admin">
                          <motion.button
                            className="w-full px-4 py-3 rounded-xl font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-all flex items-center gap-2"
                            onClick={() => setIsOpen(false)}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaTachometerAlt className="text-purple-400" />
                            Admin Dashboard
                          </motion.button>
                        </Link>
                      )}
                      
                      <Link href="/order">
                        <motion.button
                          className="w-full px-4 py-3 rounded-xl font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-all flex items-center gap-2"
                          onClick={() => setIsOpen(false)}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaShoppingCart className="text-blue-400" />
                          My Orders
                        </motion.button>
                      </Link>
                      
                      <motion.button
                        className="w-full px-4 py-3 rounded-xl font-semibold bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaSignOutAlt />
                        Logout
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <motion.button
                          className="w-full px-4 py-3 rounded-xl font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2"
                          onClick={() => setIsOpen(false)}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaUser className="text-sm" />
                          Login
                        </motion.button>
                      </Link>
                      <Link href="/signup">
                        <motion.button
                          className="w-full px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white transition-all"
                          onClick={() => setIsOpen(false)}
                          whileTap={{ scale: 0.95 }}
                        >
                          Sign Up
                        </motion.button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
