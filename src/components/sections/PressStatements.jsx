import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PressStatements = () => {
  const statements = [
    {
      id: 1,
      title: 'بيان حول أزمة التعليم العالي',
      excerpt: 'بيان صحفي يتناول التحديات التي تواجه التعليم العالي والحلول المقترحة لتطوير المنظومة التعليمية',
      date: '2024-01-20',
      category: 'تعليم',
      urgent: true,
    },
    {
      id: 2,
      title: 'موقف من قضايا البيئة والتغير المناخي',
      excerpt: 'بيان يوضح الموقف الرسمي من قضايا البيئة والتغير المناخي والإجراءات المطلوبة للحفاظ على البيئة',
      date: '2024-01-15',
      category: 'بيئة',
      urgent: false,
    },
    {
      id: 3,
      title: 'تصريح حول الإصلاحات الاقتصادية',
      excerpt: 'تصريح صحفي حول الإصلاحات الاقتصادية المطلوبة وتأثيرها على الطبقات الشعبية والمتوسطة',
      date: '2024-01-08',
      category: 'اقتصاد',
      urgent: false,
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-4 sm:mb-6">
            البيانات الصحفية
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            أحدث البيانات والتصريحات الصحفية حول القضايا المهمة والمواقف الرسمية
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {statements.map((statement, index) => (
            <motion.div
              key={statement.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-reverse lg:space-x-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-reverse space-x-4 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-brand" />
                    </div>
                    <div className="flex items-center space-x-reverse space-x-4 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        statement.urgent 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-brand/10 text-brand'
                      }`}>
                        {statement.urgent ? 'عاجل' : statement.category}
                      </span>
                      <div className="flex items-center space-x-reverse space-x-2 text-xs sm:text-sm text-gray-500">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>{new Date(statement.date).toLocaleDateString('ar-SA')}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 hover:text-brand transition-colors">
                    {statement.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                    {statement.excerpt}
                  </p>

                  <Link
                    to={`/press-statement/${statement.id}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center space-x-reverse space-x-2 text-brand font-medium hover:text-brand-dark transition-colors group text-sm sm:text-base"
                  >
                    <span>قراءة البيان كاملاً</span>
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 flex-shrink-0" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12"
        >
          <Link
            to="/press-statements"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-brand text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg inline-block text-sm sm:text-base"
          >
            عرض جميع البيانات
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PressStatements;