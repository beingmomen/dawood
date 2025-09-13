import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import Carousel from "../ui/Carousel";
import { useArticles } from "../../hooks/useApi";
import LoadingSpinner from "../ui/LoadingSpinner";
import ErrorMessage from "../ui/ErrorMessage";

const LatestArticles = () => {
  const {
    data: articlesResponse,
    loading,
    error,
    refetch,
  } = useArticles({ limit: 6 });
  const articles = articlesResponse || [];

  if (loading) {
    return (
      <section id="articles" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <LoadingSpinner text="جاري تحميل المقالات..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="articles" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      </section>
    );
  }

  const ArticleCard = ({ article, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="relative overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-brand text-white px-3 py-1 rounded-full text-sm font-medium">
            {article.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-brand transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-reverse space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(article.date).toLocaleDateString("ar-EG")}</span>
          </div>
          <div className="flex items-center space-x-reverse space-x-2 hide-views">
            <Eye className="w-4 h-4" />
            <span>{article.views}</span>
          </div>
        </div>

        <Link
          to={`/article/${article.id}`}
          className="flex items-center space-x-reverse space-x-2 text-brand font-medium hover:text-brand-dark transition-colors group"
        >
          <span>اقرأ المزيد</span>
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );

  return (
    <section id="articles" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
            أحدث المقالات
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            آخر الكتابات والتحليلات في القضايا السياسية والاجتماعية المعاصرة
          </p>
        </motion.div>

        <Carousel
          items={articles || []}
          renderItem={(article, index) => (
            <ArticleCard article={article} index={index} />
          )}
          slidesToShow={3}
          autoplay={true}
          autoplayDelay={5000}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/articles"
            className="bg-brand text-white px-8 py-4 rounded-full font-bold hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
          >
            عرض جميع المقالات
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestArticles;
