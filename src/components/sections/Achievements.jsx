import React from 'react';
import { motion } from 'framer-motion';
import { getIcon, getColor } from '../../utils/iconMap';
import { useAchievements } from '../../hooks/useApi';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';

const Achievements = () => {
  const { data: achievements, loading, error, refetch } = useAchievements();

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <LoadingSpinner text="جاري تحميل الإنجازات..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      </section>
    );
  }

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
          {(achievements || []).map((achievement, index) => {
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