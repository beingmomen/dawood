import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';

const MediaCoverage = () => {
  const coverage = [
    {
      id: 1,
      title: 'مقابلة حول الإصلاحات الاقتصادية',
      outlet: 'قناة الجزيرة',
      date: '2024-01-18',
      type: 'مقابلة تلفزيونية',
      description: 'مناقشة شاملة حول الإصلاحات الاقتصادية المطلوبة والحلول المقترحة',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '#',
    },
    {
      id: 2,
      title: 'تصريحات حول قانون الضمان الاجتماعي',
      outlet: 'صحيفة الأهرام',
      date: '2024-01-12',
      type: 'مقال صحفي',
      description: 'تصريحات مهمة حول مشروع قانون الضمان الاجتماعي الجديد وتأثيره على المواطنين',
      thumbnail: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '#',
    },
    {
      id: 3,
      title: 'ندوة حول حقوق الإنسان',
      outlet: 'راديو مونت كارلو',
      date: '2024-01-05',
      type: 'برنامج إذاعي',
      description: 'مشاركة في ندوة إذاعية حول أهمية حماية حقوق الإنسان في المنطقة العربية',
      thumbnail: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '#',
    },
  ];

  return (
    <section className="py-20 bg-white hide-media-coverage-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
            التغطية الإعلامية
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            آخر المقابلات والتصريحات الإعلامية في مختلف وسائل الإعلام المحلية والعربية
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {coverage.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-brand text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item.type}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 right-4 left-4">
                  <div className="flex items-center space-x-reverse space-x-2 text-white text-sm">
                    <Tv className="w-4 h-4" />
                    <span className="font-medium">{item.outlet}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-reverse space-x-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(item.date).toLocaleDateString('ar-EG')}</span>
                  </div>
                </div>

                <a
                  href={item.link}
                  className="flex items-center space-x-reverse space-x-2 text-brand font-medium hover:text-brand-dark transition-colors group"
                >
                  <span>مشاهدة التغطية</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/media-coverage"
            className="bg-brand text-white px-8 py-4 rounded-full font-bold hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
          >
            عرض جميع التغطيات
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MediaCoverage;