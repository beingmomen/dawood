import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Video, FileText, Play, Download, Eye } from 'lucide-react';

const MediaTabs = () => {
  const [activeTab, setActiveTab] = useState('images');

  const tabs = [
    { id: 'images', label: 'الصور', icon: Image },
    { id: 'videos', label: 'الفيديوهات', icon: Video },
    { id: 'documents', label: 'المستندات', icon: FileText },
  ];

  const mediaData = {
    images: [
      {
        id: 1,
        src: 'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'جلسة برلمانية مهمة',
        description: 'مناقشة قانون الضمان الاجتماعي',
      },
      {
        id: 2,
        src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'لقاء صحفي',
        description: 'مؤتمر صحفي حول الإصلاحات الاقتصادية',
      },
      {
        id: 3,
        src: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'زيارة ميدانية',
        description: 'زيارة لمشاريع التنمية المحلية',
      },
      {
        id: 4,
        src: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'ورشة عمل',
        description: 'ورشة حول حقوق الإنسان',
      },
      {
        id: 5,
        src: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'اجتماع لجنة',
        description: 'اجتماع لجنة الشؤون الخارجية',
      },
      {
        id: 6,
        src: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'فعالية مجتمعية',
        description: 'فعالية خيرية للأطفال المحتاجين',
      },
    ],
    videos: [
      {
        id: 1,
        videoId: 'dQw4w9WgXcQ',
        title: 'كلمة في البرلمان حول التعليم',
        duration: '15:30',
        views: '25K',
      },
      {
        id: 2,
        videoId: 'jNQXAC9IVRw',
        title: 'مقابلة تلفزيونية حول الإصلاحات',
        duration: '22:45',
        views: '18K',
      },
      {
        id: 3,
        videoId: 'y6120QOlsfU',
        title: 'تقرير إخباري عن الأنشطة البرلمانية',
        duration: '8:20',
        views: '12K',
      },
      {
        id: 4,
        videoId: 'kJQP7kiw5Fk',
        title: 'ندوة حول حقوق المرأة',
        duration: '45:15',
        views: '30K',
      },
    ],
    documents: [
      {
        id: 1,
        title: 'تقرير الأداء البرلماني 2023',
        type: 'PDF',
        size: '2.5 MB',
        downloads: '1.2K',
      },
      {
        id: 2,
        title: 'مشروع قانون الضمان الاجتماعي',
        type: 'PDF',
        size: '1.8 MB',
        downloads: '850',
      },
      {
        id: 3,
        title: 'دراسة حول التنمية المستدامة',
        type: 'PDF',
        size: '3.2 MB',
        downloads: '920',
      },
      {
        id: 4,
        title: 'تقرير لجنة حقوق الإنسان',
        type: 'PDF',
        size: '2.1 MB',
        downloads: '750',
      },
    ],
  };

  return (
    <section id="media" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
            الوسائط والمحتوى
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            مجموعة شاملة من الصور والفيديوهات والمستندات التي توثق الأنشطة والإنجازات
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-full p-2 flex space-x-reverse space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-reverse space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-brand text-white shadow-lg'
                    : 'text-gray-600 hover:text-brand'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaData.images.map((image, index) => (
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 right-4 left-4 text-white">
                        <h3 className="font-bold mb-1">{image.title}</h3>
                        <p className="text-sm text-white/80">{image.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mediaData.videos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                  >
                    <div className="relative aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.videoId}`}
                        title={video.title}
                        className="w-full h-full rounded-t-2xl"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-2">{video.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-reverse space-x-2">
                          <Eye className="w-4 h-4" />
                          <span>{video.views} مشاهدة</span>
                        </div>
                        <span>{video.duration}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mediaData.documents.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-start space-x-reverse space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-2">{doc.title}</h3>
                        <div className="flex items-center space-x-reverse space-x-4 text-sm text-gray-500 mb-4">
                          <span>{doc.type}</span>
                          <span>{doc.size}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-reverse space-x-2 text-sm text-gray-500">
                            <Download className="w-4 h-4" />
                            <span>{doc.downloads} تحميل</span>
                          </div>
                          <button className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors">
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/media"
            className="bg-brand text-white px-8 py-4 rounded-full font-bold hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
          >
            عرض جميع الوسائط
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default MediaTabs;