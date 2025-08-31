import React from 'react';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'فيسبوك' },
    { icon: Twitter, href: '#', label: 'تويتر' },
    { icon: Instagram, href: '#', label: 'إنستغرام' },
    { icon: Linkedin, href: '#', label: 'لينكد إن' },
    { icon: Youtube, href: '#', label: 'يوتيوب' },
  ];

  const quickLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'المقالات', href: '/articles' },
    { name: 'السيرة الذاتية', href: '/cv' },
    { name: 'الوسائط', href: '/media' },
    { name: 'البيانات الصحفية', href: '/press-statements' },
  ];

  const legalLinks = [
    { name: 'سياسة الخصوصية', href: '/privacy-policy' },
    { name: 'شروط الاستخدام', href: '/terms-of-service' },
    { name: 'إخلاء المسؤولية', href: '/disclaimer' },
  ];

  return (
    <footer id="contact" className="bg-brand-dark text-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 min-w-0"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">محمد عبدالعليم داود</h3>
              <p className="text-white/80">صحفي وعضو برلمان</p>
            </div>
            
            <p className="text-white/80 leading-relaxed mb-6 max-w-md">
              صحفي محترف وعضو برلمان ملتزم بخدمة الوطن والمواطنين، أسعى لتحقيق العدالة الاجتماعية والتنمية المستدامة من خلال العمل الصحفي والبرلماني المتميز.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-reverse space-x-3 min-w-0">
                <Mail className="w-5 h-5 text-white/60 flex-shrink-0" />
                <span className="text-white/80 truncate">mohammed.journalist@email.com</span>
              </div>
              <div className="flex items-center space-x-reverse space-x-3 min-w-0">
                <Phone className="w-5 h-5 text-white/60 flex-shrink-0" />
                <span className="text-white/80">+20 10 123 4567</span>
              </div>
              <div className="flex items-center space-x-reverse space-x-3 min-w-0">
                <MapPin className="w-5 h-5 text-white/60 flex-shrink-0" />
                <span className="text-white/80">القاهرة، جمهورية مصر العربية</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="min-w-0"
          >
            <h4 className="text-xl font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-white/80 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="min-w-0"
          >
            <h4 className="text-xl font-bold mb-6">معلومات قانونية</h4>
            <ul className="space-y-3 mb-8">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-white/80 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h5 className="font-bold mb-4">تابعني على</h5>
              <div className="flex space-x-reverse space-x-3 flex-wrap">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200 flex-shrink-0"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-white/20 mt-12 pt-8 text-center"
        >
          <p className="text-white/60 flex items-center justify-center space-x-reverse space-x-2 flex-wrap text-sm">
            <span>© 2024 محمد عبدالعليم داود. جميع الحقوق محفوظة. صُنع بـ</span>
            <Heart className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>في جمهورية مصر العربية</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;