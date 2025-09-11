import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Tv, Search, Filter, Eye } from 'lucide-react';

const MediaCoveragePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('الكل');

  const types = ['الكل', 'مقابلة تلفزيونية', 'مقال صحفي', 'برنامج إذاعي', 'تقرير إخباري'];

  const coverage = [
    {
      id: 1,
      title: 'مقابلة حول الإصلاحات الاقتصادية',
      outlet: 'قناة الجزيرة',
      date: '2024-01-18',
      type: 'مقابلة تلفزيونية',
      description: 'مناقشة شاملة حول الإصلاحات الاقتصادية المطلوبة والحلول المقترحة لمواجهة التحديات الاقتصادية الراهنة',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '#',
      views: '125K',
      duration: '25:30',
    },
    {
      id: 2,
      title: 'تصريحات حول قانون الضمان الاجتماعي',
      outlet: 'صحيفة الأهرام',
      date: '2024-01-12',
      type: 'مقال صحفي',
      description: 'تصريحات مهمة حول مشروع قانون الضمان الاجتماعي الجديد وتأثيره على المواطنين والطبقات الشعبية',
      thumbnail: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '#',
      views: '89K',
      duration: null,
    },
    {
      id: 3,
      title: 'ندوة حول حقوق الإنسان',
      outlet: 'راديو مونت كارلو',
      date: '2024-01-05',
      type: 'برنامج إذاعي',
      description: 'مشاركة في ندوة إذاعية حول أهمية حماية حقوق الإنسان في المنطقة العربية والتحديات المعاصرة',
      thumbnail: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '#',
      views: '67K',
      duration: '45:15',
    },
    {
      id: 4,
      title: 'تقرير حول الأنشطة البرلمانية',
      outlet: 'قناة العربية',
      date: '2023-12-28',
      type: 'تقرير إخباري',
      description: 'تقرير شامل حول أهم الأنشطة البرلمانية والقوانين التي تم مناقشتها في الفصل التشريعي الحالي',
      thumbnail: 'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '#',
      views: '156K',
      duration: '12:45',
    },
    {
      id: 5,
      title: 'حوار حول التعليم العالي',
      outlet: 'قناة الحدث',
      date: '2023-12-20',
      type: 'مقابلة تلفزيونية',
      description: 'حوار معمق حول تحديات التعليم العالي في المنطقة العربية والحلول المقترحة لتطوير المنظومة التعليمية',
      thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '#',
      views: '98K',
      duration: '35:20',
    },
    {
      id: 6,
      title: 'مقال حول البيئة والتغير المناخي',
      outlet: 'جريدة الشرق الأوسط',
      date: '2023-12-15',
      type: 'مقال صحفي',
      description: 'مقال تحليلي حول قضايا البيئة والتغير المناخي وأهمية اتخاذ إجراءات عاجلة للحفاظ على البيئة',
      thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '#',
      views: '73K',
      duration: null,
    },
    {
      id: 7,
      title: 'برنامج حول الشباب والتوظيف',
      outlet: 'إذاعة BBC العربية',
      date: '2023-12-08',
      type: 'برنامج إذاعي',
      description: 'مشاركة في برنامج إذاعي حول تحديات التوظيف التي تواجه الشباب العربي والحلول المقترحة',
      thumbnail: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '#',
      views: '54K',
      duration: '28:40',
    },
    {
      id: 8,
      title: 'تقرير حول المرأة في البرلمان',
      outlet: 'قناة الميادين',
      date: '2023-12-01',
      type: 'تقرير إخباري',
      description: 'تقرير حول دور المرأة في العمل البرلماني وأهمية تعزيز مشاركتها في صنع القرار السياسي',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '#',
      views: '112K',
      duration: '18:25',
    },
  ];

  const filteredCoverage = coverage.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.outlet.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'الكل' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

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
            التغطية الإعلامية
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            مجموعة شاملة من المقابلات والتصريحات الإعلامية في مختلف وسائل الإعلام المحلية والعربية
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="البحث في التغطيات الإعلامية..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
              />
            </div>

            {/* Types */}
            <div className="flex items-center space-x-reverse space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Coverage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCoverage.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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
                  <div className="flex items-center justify-between text-white text-sm">
                    <div className="flex items-center space-x-reverse space-x-2">
                      <Tv className="w-4 h-4" />
                      <span className="font-medium">{item.outlet}</span>
                    </div>
                    {item.duration && (
                      <span className="bg-black/50 px-2 py-1 rounded text-xs">
                        {item.duration}
                      </span>
                    )}
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
                    <span>{new Date(item.date).toLocaleDateString('ar-SA')}</span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-2 text-sm text-gray-500">
                    <Eye className="w-4 h-4" />
                    <span>{item.views}</span>
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

        {/* No Results */}
        {filteredCoverage.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-500">لا توجد تغطيات تطابق البحث</p>
          </motion.div>
        )}

        {/* Load More */}
        {filteredCoverage.length > 0 && (
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

export default MediaCoveragePage;