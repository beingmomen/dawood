import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Video, FileText, Play, Download, Eye, Search, Filter } from 'lucide-react';

const MediaPage = () => {
  const [activeTab, setActiveTab] = useState('images');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'images', label: 'الصور', icon: Image },
    { id: 'videos', label: 'الفيديوهات', icon: Video },
    { id: 'documents', label: 'المستندات', icon: FileText },
  ];

  const mediaData = {
    images: [
      {
        id: 1,
        src: 'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'جلسة برلمانية مهمة',
        description: 'مناقشة قانون الضمان الاجتماعي في مجلس الشورى',
        date: '2024-01-15',
        category: 'برلمان',
      },
      {
        id: 2,
        src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'لقاء صحفي',
        description: 'مؤتمر صحفي حول الإصلاحات الاقتصادية المقترحة',
        date: '2024-01-12',
        category: 'إعلام',
      },
      {
        id: 3,
        src: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'زيارة ميدانية',
        description: 'زيارة لمشاريع التنمية المحلية في المنطقة الشرقية',
        date: '2024-01-08',
        category: 'زيارات',
      },
      {
        id: 4,
        src: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'ورشة عمل',
        description: 'ورشة حول حقوق الإنسان والحريات المدنية',
        date: '2024-01-05',
        category: 'فعاليات',
      },
      {
        id: 5,
        src: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'اجتماع لجنة',
        description: 'اجتماع لجنة الشؤون الخارجية والأمن الوطني',
        date: '2024-01-02',
        category: 'برلمان',
      },
      {
        id: 6,
        src: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'فعالية مجتمعية',
        description: 'فعالية خيرية للأطفال المحتاجين في الرياض',
        date: '2023-12-28',
        category: 'مجتمع',
      },
      {
        id: 7,
        src: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'مؤتمر دولي',
        description: 'المشاركة في المؤتمر البرلماني العربي في القاهرة',
        date: '2023-12-20',
        category: 'مؤتمرات',
      },
      {
        id: 8,
        src: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'لقاء شبابي',
        description: 'لقاء مع الشباب لمناقشة قضايا التعليم والتوظيف',
        date: '2023-12-15',
        category: 'شباب',
      },
    ],
    videos: [
      {
        id: 1,
        videoId: 'dQw4w9WgXcQ',
        title: 'كلمة في البرلمان حول التعليم',
        description: 'كلمة مهمة حول إصلاح منظومة التعليم العالي',
        duration: '15:30',
        views: '25K',
        date: '2024-01-18',
      },
      {
        id: 2,
        videoId: 'jNQXAC9IVRw',
        title: 'مقابلة تلفزيونية حول الإصلاحات',
        description: 'مقابلة شاملة حول الإصلاحات الاقتصادية والاجتماعية',
        duration: '22:45',
        views: '18K',
        date: '2024-01-15',
      },
      {
        id: 3,
        videoId: 'y6120QOlsfU',
        title: 'تقرير إخباري عن الأنشطة البرلمانية',
        description: 'تقرير مفصل عن أهم الأنشطة البرلمانية للفصل الحالي',
        duration: '8:20',
        views: '12K',
        date: '2024-01-10',
      },
      {
        id: 4,
        videoId: 'kJQP7kiw5Fk',
        title: 'ندوة حول حقوق المرأة',
        description: 'ندوة متخصصة حول تعزيز حقوق المرأة في المجتمع',
        duration: '45:15',
        views: '30K',
        date: '2024-01-05',
      },
      {
        id: 5,
        videoId: 'LDU_Txk06tM',
        title: 'خطاب في المؤتمر الاقتصادي',
        description: 'خطاب حول التحديات الاقتصادية وسبل مواجهتها',
        duration: '18:42',
        views: '22K',
        date: '2023-12-28',
      },
      {
        id: 6,
        videoId: 'fJ9rUzIMcZQ',
        title: 'حوار حول السياسة الخارجية',
        description: 'حوار معمق حول السياسة الخارجية والعلاقات الدولية',
        duration: '35:20',
        views: '16K',
        date: '2023-12-20',
      },
    ],
    documents: [
      {
        id: 1,
        title: 'تقرير الأداء البرلماني 2023',
        description: 'تقرير شامل عن الأنشطة والإنجازات البرلمانية لعام 2023',
        type: 'PDF',
        size: '2.5 MB',
        downloads: '1.2K',
        date: '2024-01-01',
      },
      {
        id: 2,
        title: 'مشروع قانون الضمان الاجتماعي',
        description: 'النص الكامل لمشروع قانون الضمان الاجتماعي المقترح',
        type: 'PDF',
        size: '1.8 MB',
        downloads: '850',
        date: '2023-12-15',
      },
      {
        id: 3,
        title: 'دراسة حول التنمية المستدامة',
        description: 'دراسة تحليلية حول استراتيجيات التنمية المستدامة',
        type: 'PDF',
        size: '3.2 MB',
        downloads: '920',
        date: '2023-12-10',
      },
      {
        id: 4,
        title: 'تقرير لجنة حقوق الإنسان',
        description: 'التقرير السنوي للجنة حقوق الإنسان والحريات المدنية',
        type: 'PDF',
        size: '2.1 MB',
        downloads: '750',
        date: '2023-12-05',
      },
      {
        id: 5,
        title: 'مذكرة حول الإصلاح التعليمي',
        description: 'مذكرة تفصيلية حول مقترحات إصلاح النظام التعليمي',
        type: 'PDF',
        size: '1.9 MB',
        downloads: '680',
        date: '2023-11-28',
      },
      {
        id: 6,
        title: 'خطة التطوير الاقتصادي',
        description: 'خطة شاملة للتطوير الاقتصادي والاستثمار المحلي',
        type: 'PDF',
        size: '2.8 MB',
        downloads: '1.1K',
        date: '2023-11-20',
      },
    ],
  };

  const filteredData = mediaData[activeTab].filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            مكتبة الوسائط
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            مجموعة شاملة من الصور والفيديوهات والمستندات التي توثق الأنشطة والإنجازات
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="البحث في الوسائط..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-full p-2 flex space-x-reverse space-x-2 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-reverse space-x-2 px-8 py-4 rounded-full font-medium transition-all duration-300 ${
                  tab.id === 'documents' ? 'hide-documents-section' : ''
                } ${
                  activeTab === tab.id
                    ? 'bg-brand text-white shadow-lg'
                    : 'text-gray-600 hover:text-brand hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'images' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredData.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 right-4 left-4 text-white">
                        <span className="bg-brand px-2 py-1 rounded text-xs font-medium mb-2 inline-block">
                          {image.category}
                        </span>
                        <h3 className="font-bold mb-1 text-sm">{image.title}</h3>
                        <p className="text-xs text-white/80 line-clamp-2">{image.description}</p>
                        <p className="text-xs text-white/60 mt-1">{new Date(image.date).toLocaleDateString('ar-SA')}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredData.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.videoId}`}
                        title={video.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{video.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{video.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-reverse space-x-2">
                          <Eye className="w-4 h-4" />
                          <span>{video.views} مشاهدة</span>
                        </div>
                        <div className="flex items-center space-x-reverse space-x-4">
                          <span>{video.duration}</span>
                          <span>{new Date(video.date).toLocaleDateString('ar-SA')}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 hide-documents-section">
                {filteredData.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-start space-x-reverse space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{doc.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{doc.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-reverse space-x-4">
                            <span>{doc.type}</span>
                            <span>{doc.size}</span>
                          </div>
                          <span>{new Date(doc.date).toLocaleDateString('ar-SA')}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-reverse space-x-2 text-sm text-gray-500">
                            <Download className="w-4 h-4" />
                            <span>{doc.downloads} تحميل</span>
                          </div>
                          <button className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors text-sm font-medium">
                            تحميل
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-500">لا توجد نتائج تطابق البحث</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MediaPage;