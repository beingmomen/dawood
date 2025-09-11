import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Eye, Clock, Share2, Facebook, Twitter, Linkedin, ArrowRight, User } from 'lucide-react';
import articlesData from '../data/articles.json';

const ArticlePage = () => {
  const { id } = useParams();
  const article = articlesData.find(a => a.id === parseInt(id || '1'));

  if (!article) {
    return <div>المقال غير موجود</div>;
  }

  const relatedArticles = articlesData.filter(a => a.id !== article.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-reverse space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-brand">الرئيسية</Link>
            <span>/</span>
            <Link to="/articles" className="hover:text-brand">المقالات</Link>
            <span>/</span>
            <span className="text-brand">{article.title}</span>
          </div>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Article Header */}
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-6 right-6">
                  <span className="bg-brand text-white px-4 py-2 rounded-full font-medium">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6 leading-tight">
                  {article.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-500">
                  <div className="flex items-center space-x-reverse space-x-2">
                    <User className="w-5 h-5" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(article.date).toLocaleDateString('ar-EG')}</span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-2 hide-read-time">
                    <Clock className="w-5 h-5" />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-2 hide-views">
                    <Eye className="w-5 h-5" />
                    <span>{article.views}</span>
                  </div>
                </div>

                {/* Content */}
                <div 
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Tags */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-bold mb-4">الكلمات المفتاحية</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-brand hover:text-white transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-bold mb-4">شارك المقال</h3>
                  <div className="flex space-x-reverse space-x-4">
                    <button className="flex items-center space-x-reverse space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <Facebook className="w-5 h-5" />
                      <span>فيسبوك</span>
                    </button>
                    <button className="flex items-center space-x-reverse space-x-2 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                      <Twitter className="w-5 h-5" />
                      <span>تويتر</span>
                    </button>
                    <button className="flex items-center space-x-reverse space-x-2 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors">
                      <Linkedin className="w-5 h-5" />
                      <span>لينكد إن</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg mb-8"
            >
              <div className="text-center">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="محمد عبدالعليم داود"
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-brand-dark mb-2">محمد عبدالعليم داود</h3>
                <p className="text-gray-600 mb-4">صحفي وعضو برلمان</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  صحفي محترف وعضو برلمان ملتزم بخدمة الوطن والمواطنين، أسعى لتحقيق العدالة الاجتماعية والتنمية المستدامة.
                </p>
              </div>
            </motion.div>

            {/* Related Articles */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-brand-dark mb-6">مقالات ذات صلة</h3>
              <div className="space-y-4">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    to={`/article/${relatedArticle.id}`}
                    className="flex space-x-reverse space-x-4 group"
                  >
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 group-hover:text-brand transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(relatedArticle.date).toLocaleDateString('ar-EG')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Back to Articles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/articles"
            className="inline-flex items-center space-x-reverse space-x-2 bg-brand text-white px-8 py-4 rounded-full font-bold hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <ArrowRight className="w-5 h-5" />
            <span>العودة إلى المقالات</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ArticlePage;