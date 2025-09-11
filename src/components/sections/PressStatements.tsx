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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
            البيانات الصحفية
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            أحدث البيانات والتصريحات الصحفية حول القضايا المهمة والمواقف الرسمية
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {statements.map((statement, index) => (
            <motion.div
              key={statement.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-reverse lg:space-x-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-reverse space-x-4 mb-4">
                    <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-brand" />
                    </div>
                    <div className="flex items-center space-x-reverse space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        statement.urgent 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-brand/10 text-brand'
                      }`}>
                        {statement.urgent ? 'عاجل' : statement.category}
                      </span>
                      <div className="flex items-center space-x-reverse space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(statement.date).toLocaleDateString('ar-SA')}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-4 hover:text-brand transition-colors">
                    {statement.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {statement.excerpt}
                  </p>

                  <Link
                    to={`/press-statement/${statement.id}`}
                    className="flex items-center space-x-reverse space-x-2 text-brand font-medium hover:text-brand-dark transition-colors group"
                  >
                    <span>قراءة البيان كاملاً</span>
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
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
          className="text-center mt-12"
        >
          <Link
            to="/press-statements"
            className="bg-brand text-white px-8 py-4 rounded-full font-bold hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
          >
            عرض جميع البيانات
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PressStatements;