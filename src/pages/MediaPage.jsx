import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Video, FileText, Play, Download, Eye, Search, Filter } from 'lucide-react';
import { useMedia } from '../hooks/useApi';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

const MediaPage = () => {
  const [activeTab, setActiveTab] = useState('images');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: mediaData, loading, error, refetch } = useMedia();

  const tabs = [
    { id: 'images', label: 'الصور', icon: Image },
    { id: 'videos', label: 'الفيديوهات', icon: Video },
    { id: 'documents', label: 'المستندات', icon: FileText },
  ];



  const filteredData = (mediaData?.[activeTab] || []).filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-12">
          <LoadingSpinner text="جاري تحميل الوسائط..." />
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
                        <p className="text-xs text-white/60 mt-1">{new Date(image.date).toLocaleDateString('ar-EG')}</p>
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
                          <span>{new Date(video.date).toLocaleDateString('ar-EG')}</span>
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
                          <span>{new Date(doc.date).toLocaleDateString('ar-EG')}</span>
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