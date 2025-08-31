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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
            الإنجازات والجوائز
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            مسيرة حافلة بالإنجازات والتكريمات في مجالي الصحافة والعمل البرلماني
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-16 h-16 ${achievement.color} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                <achievement.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="text-center">
                <div className="text-sm font-bold text-brand mb-2">{achievement.year}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{achievement.title}</h3>
                <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;