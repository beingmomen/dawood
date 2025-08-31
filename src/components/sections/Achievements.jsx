import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Star, Medal } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    {
      icon: Award,
      title: 'جائزة أفضل صحفي',
      description: 'حصلت على جائزة أفضل صحفي لعام 2023 من نقابة الصحفيين',
      year: '2023',
      color: 'bg-yellow-500',
    },
    {
      icon: Trophy,
      title: 'جائزة التميز البرلماني',
      description: 'تكريم لأفضل أداء برلماني في مجال حقوق الإنسان',
      year: '2022',
      color: 'bg-blue-500',
    },
    {
      icon: Star,
      title: 'جائزة الصحافة الاستقصائية',
      description: 'تقدير للتحقيقات الصحفية المتميزة في قضايا الفساد',
      year: '2021',
      color: 'bg-green-500',
    },
    {
      icon: Medal,
      title: 'وسام الاستحقاق',
      description: 'وسام من رئيس الجمهورية تقديراً للخدمات الوطنية',
      year: '2020',
      color: 'bg-purple-500',
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-4 sm:mb-6">
            الإنجازات والجوائز
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            مسيرة حافلة بالإنجازات والتكريمات في مجالي الصحافة والعمل البرلماني
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-12 h-12 sm:w-16 sm:h-16 ${achievement.color} rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto`}>
                <achievement.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              
              <div className="text-center">
                <div className="text-sm font-bold text-brand mb-2">{achievement.year}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">{achievement.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;