import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import Carousel from "../ui/Carousel";
import articlesData from "../../data/articles.json";

const LatestArticles = () => {
  const ArticleCard = ({ article, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col mx-auto max-w-sm w-full"
    >
      <div className="relative overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 sm:h-52 md:h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-brand text-white px-3 py-1 rounded-full text-sm font-medium">
            {article.category}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-brand transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-sm sm:text-base flex-grow">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-reverse space-x-2">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">
              {new Date(article.date).toLocaleDateString("ar-SA")}
            </span>
          </div>
          <div className="flex items-center space-x-reverse space-x-2">
            <Eye className="w-4 h-4 flex-shrink-0" />
            <span>{article.views}</span>
          </div>
        </div>

        <Link
          to={`/article/${article.id}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center space-x-reverse space-x-2 text-brand font-medium hover:text-brand-dark transition-colors group mt-auto"
        >
          <span className="text-sm sm:text-base">اقرأ المزيد</span>
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 flex-shrink-0" />
        </Link>
      </div>
    </motion.div>
  );

  return (
    <section id="articles" className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-4 sm:mb-6">
            أحدث المقالات
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            آخر الكتابات والتحليلات في القضايا السياسية والاجتماعية المعاصرة
          </p>
        </motion.div>

        <div className="mb-8 sm:mb-12">
          <Carousel
            items={articlesData}
            renderItem={(article, index) => (
              <ArticleCard article={article} index={index} />
            )}
            slidesToShow={1}
            autoplay={true}
            autoplayDelay={5000}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/articles"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-brand text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg inline-block text-sm sm:text-base"
          >
            عرض جميع المقالات
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestArticles;
