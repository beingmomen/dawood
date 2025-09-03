import React from 'react';
import { motion } from 'framer-motion';
import { getIcon, getColor } from '../../utils/iconMap';

const Achievements = () => {
  // البيانات الثابتة (يمكن استبدالها ببيانات من API)
  const achievements = [
    {
      iconName: 'award',
      title: 'جائزة أفضل صحفي',
      description: 'حصلت على جائزة أفضل صحفي لعام 2023 من نقابة الصحفيين',
      year: '2023',
      colorName: 'yellow',
    },
    {
      iconName: 'trophy',
      title: 'جائزة التميز البرلماني',
      description: 'تكريم لأفضل أداء برلماني في مجال حقوق الإنسان',
      year: '2022',
      colorName: 'blue',
    },
    {
      iconName: 'star',
      title: 'جائزة الصحافة الاستقصائية',
      description: 'تقدير للتحقيقات الصحفية المتميزة في قضايا الفساد',
      year: '2021',
      colorName: 'green',
    },
    {
      iconName: 'medal',
      title: 'وسام الاستحقاق',
      description: 'وسام من رئيس الجمهورية تقديراً للخدمات الوطنية',
      year: '2020',
      colorName: 'purple',
    },
    {
      iconName: 'crown',
      title: 'جائزة القيادة المجتمعية',
      description: 'تكريم للجهود المتميزة في خدمة المجتمع والعمل الخيري',
      year: '2019',
      colorName: 'indigo',
    },
    {
      iconName: 'shield',
      title: 'جائزة الدفاع عن الحقوق',
      description: 'تقدير للجهود في الدفاع عن حقوق المواطنين والعدالة الاجتماعية',
      year: '2018',
      colorName: 'red',
    },
    {
      iconName: 'target',
      title: 'جائزة الإنجاز المهني',
      description: 'تكريم للتميز في الأداء المهني والصحفي على مدار العقد الماضي',
      year: '2017',
      colorName: 'orange',
    },
    {
      iconName: 'zap',
      title: 'جائزة الابتكار الإعلامي',
      description: 'تقدير للابتكار في استخدام التقنيات الحديثة في الصحافة',
      year: '2016',
      colorName: 'cyan',
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
            const IconComponent = getIcon(achievement.iconName);
            const colorClass = getColor(achievement.colorName);
            
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-16 h-16 ${colorClass} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              
              <div className="text-center">
                <div className="text-sm font-bold text-brand mb-2">{achievement.year}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{achievement.title}</h3>
                <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;