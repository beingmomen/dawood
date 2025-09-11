import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Award, Users, FileText } from 'lucide-react';
import { usePersonalInfo } from '../../hooks/useApi';

const Hero = () => {
  const { data: personalInfo } = usePersonalInfo();

  const stats = [
    { icon: FileText, value: '150+', label: 'مقال منشور' },
    { icon: Award, value: '25+', label: 'جائزة وتكريم' },
    { icon: Users, value: '500K+', label: 'متابع' },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand to-brand-light"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
      <div className="absolute bottom-32 left-16 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            {personalInfo?.name || 'محمد عبدالعليم داود'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed"
          >
            {personalInfo?.title || 'صحفي وعضو برلمان'}
            <br />
            {personalInfo?.summary?.split('.')[0] || 'أسعى لتحقيق العدالة الاجتماعية والتنمية المستدامة'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center mb-12"
          >
            <button
              onClick={() => scrollToSection('contact')}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-brand transition-all duration-300 transform hover:scale-105"
            >
              تواصل معي
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-white/80" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <ArrowDown className="w-6 h-6 text-white/60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;