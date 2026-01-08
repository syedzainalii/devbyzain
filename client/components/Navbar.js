'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaShoppingCart, FaTachometerAlt } from 'react-icons/fa';
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
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

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
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-slate-950/95 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                <span className="text-white font-black text-xl sm:text-2xl">D</span>
              </div>
              <h1 className="text-lg sm:text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                DevbyZain
              </h1>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <motion.div
                  className={`relative px-6 py-3 font-semibold text-base transition-all ${
                    pathname === link.href
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>
            
          {/* Auth Section */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                    <FaUser className="text-white text-sm" />
                  </div>
                  <span className="font-semibold text-white">{user.name || user.email.split('@')[0]}</span>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0"
                        onClick={() => setShowUserMenu(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-64 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                      >
                        <div className="p-4 border-b border-white/10">
                          <p className="text-sm font-semibold text-white">{user.name || user.email.split('@')[0]}</p>
                          <p className="text-xs text-gray-400 truncate">{user.email}</p>
                          {user.is_admin && (
                            <span className="inline-block mt-2 px-3 py-1 text-xs font-bold bg-purple-500 text-white rounded-full">
                              ADMIN
                            </span>
                          )}
                        </div>
                        
                        <div className="py-2">
                          {user.is_admin && (
                            <Link href="/admin">
                              <button
                                className="w-full px-4 py-3 text-left text-gray-300 hover:bg-white/5 transition-all flex items-center gap-3"
                                onClick={() => setShowUserMenu(false)}
                              >
                                <FaTachometerAlt className="text-purple-400" />
                                <span>Admin Dashboard</span>
                              </button>
                            </Link>
                          )}
                          
                          <Link href="/order">
                            <button
                              className="w-full px-4 py-3 text-left text-gray-300 hover:bg-white/5 transition-all flex items-center gap-3"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <FaShoppingCart className="text-blue-400" />
                              <span>My Orders</span>
                            </button>
                          </Link>
                          
                          <div className="border-t border-white/10 my-2"></div>
                          
                          <button
                            className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10 transition-all flex items-center gap-3"
                            onClick={handleLogout}
                          >
                            <FaSignOutAlt />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <motion.button
                    className="px-6 py-3 font-semibold text-gray-300 hover:text-white transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login
                  </motion.button>
                </Link>
                <Link href="/signup">
                  <motion.button
                    className="px-6 py-3 font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl transition-all shadow-lg shadow-purple-500/50"
                    whileHover={{ scale: 1.05 }}
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
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors active:bg-white/20"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t border-white/10 bg-slate-950/50 backdrop-blur-xl"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <motion.div
                      className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${
                        pathname === link.href
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                      onClick={() => setIsOpen(false)}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.name}
                    </motion.div>
                  </Link>
                ))}
                
                <div className="pt-4 space-y-2 border-t border-white/10">
                  {user ? (
                    <>
                      <div className="px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-sm font-semibold text-white">{user.name || user.email.split('@')[0]}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        {user.is_admin && (
                          <span className="inline-block mt-2 px-3 py-1 text-xs font-bold bg-purple-500 text-white rounded-full">
                            ADMIN
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
                          className="w-full px-4 py-3 rounded-xl font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-all"
                          onClick={() => setIsOpen(false)}
                          whileTap={{ scale: 0.95 }}
                        >
                          Login
                        </motion.button>
                      </Link>
                      <Link href="/signup">
                        <motion.button
                          className="w-full px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white transition-all"
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
    </nav>
  );
}