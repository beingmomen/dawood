import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, FileText, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePressStatements } from '../hooks/useApi';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

const PressStatementsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: statementsData, loading, error, refetch } = usePressStatements();

  const filteredStatements = (statementsData || []).filter(statement => {
    const matchesSearch = statement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         statement.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-12">
          <LoadingSpinner text="جاري تحميل البيانات الصحفية..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-12">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
            البيانات الصحفية
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            مجموعة شاملة من البيانات والتصريحات الصحفية حول القضايا المهمة والمواقف الرسمية
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-12"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="البحث في البيانات الصحفية..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Statements List */}
        <div className="space-y-8">
          {filteredStatements.map((statement, index) => (
            <motion.article
              key={statement.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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
                        <span>{new Date(statement.date).toLocaleDateString('ar-EG')}</span>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-800 mb-4 hover:text-brand transition-colors">
                    {statement.title}
                  </h2>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {statement.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-reverse space-x-6 text-sm text-gray-500 hide-press-stats">
                      <span>{statement.views} مشاهدة</span>
                      <span>{statement.shares} مشاركة</span>
                    </div>
                    
                    <Link
                      to={`/press-statement/${statement.id}`}
                      className="flex items-center space-x-reverse space-x-2 text-brand font-medium hover:text-brand-dark transition-colors group"
                    >
                      <span>قراءة البيان كاملاً</span>
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredStatements.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-500">لا توجد بيانات تطابق البحث</p>
          </motion.div>
        )}

        {/* Load More */}
        {filteredStatements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-12"
          >
            <button className="bg-brand text-white px-8 py-4 rounded-full font-bold hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg">
              تحميل المزيد
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PressStatementsPage;