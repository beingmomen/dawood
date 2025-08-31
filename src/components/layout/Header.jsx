import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, User, Camera, Phone, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'الرئيسية', href: '/', icon: Home },
    { name: 'المقالات', href: '/articles', icon: FileText },
    { name: 'السيرة الذاتية', href: '/cv', icon: User },
    { name: 'الوسائط', href: '/media', icon: Camera },
    { name: 'البيانات الصحفية', href: '/press-statements', icon: FileText },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <header className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
      isScrolled || !isHomePage ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 max-w-full">
        <div className="flex items-center justify-between h-16 min-w-0">
          {/* Logo */}
          <Link to="/" className="flex items-center min-w-0 flex-shrink-0">
            <div>
              <h1 className={`text-lg font-bold transition-colors duration-300 truncate ${
                isScrolled || !isHomePage ? 'text-brand-dark' : 'text-white'
              }`}>
                محمد عبدالعليم داود
              </h1>
              <p className={`text-sm transition-colors duration-300 truncate ${
                isScrolled || !isHomePage ? 'text-gray-600' : 'text-white/80'
              }`}>
                صحفي وعضو برلمان
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-reverse space-x-4 lg:space-x-8 min-w-0">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors duration-300 px-2 lg:px-3 py-2 rounded-lg whitespace-nowrap text-sm lg:text-base ${
                  location.pathname === item.href
                    ? 'text-white bg-brand'
                    : isScrolled || !isHomePage
                    ? 'text-gray-700 hover:text-brand hover:bg-gray-50' 
                    : 'text-white hover:text-white/80 hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 flex-shrink-0 ${
              isScrolled || !isHomePage
                ? 'hover:bg-gray-100 text-gray-700' 
                : 'hover:bg-white/10 text-white'
            }`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t shadow-lg overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 max-w-full">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full"
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-reverse space-x-3 py-3 px-3 rounded-lg transition-colors w-full ${
                      location.pathname === item.href
                        ? 'text-white bg-brand'
                        : 'text-gray-700 hover:text-brand hover:bg-gray-50'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;