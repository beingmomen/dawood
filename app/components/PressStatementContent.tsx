'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, FileText, Share2, Facebook, Twitter, Linkedin, ArrowRight, User, Eye } from 'lucide-react';
import Link from 'next/link';
import Header from './layout/Header';
import Footer from './layout/Footer';
import BackToTop from './ui/BackToTop';

interface PressStatementContentProps {
  statement: any;
}

export default function PressStatementContent({ statement }: PressStatementContentProps) {
  const relatedStatements = [
    {
      id: 2,
      title: 'موقف من قضايا البيئة والتغير المناخي',
      date: '2024-01-15',
      category: 'بيئة',
    },
    {
      id: 3,
      title: 'تصريح حول الإصلاحات الاقتصادية',
      date: '2024-01-08',
      category: 'اقتصاد',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-reverse space-x-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-brand">الرئيسية</Link>
              <span>/</span>
              <Link href="/press-statements" className="hover:text-brand">البيانات الصحفية</Link>
              <span>/</span>
              <span className="text-brand">{statement.title}</span>
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
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-center space-x-reverse space-x-4 mb-6">
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

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6 leading-tight">
                    {statement.title}
                  </h1>

                  {/* Meta Info - مخفي */}
                  <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-500 hide-press-stats">
                    <div className="flex items-center space-x-reverse space-x-2">
                      <User className="w-5 h-5" />
                      <span>{statement.author}</span>
                    </div>
                    <div className="flex items-center space-x-reverse space-x-2">
                      <Eye className="w-5 h-5" />
                      <span>{statement.views} مشاهدة</span>
                    </div>
                    <div className="flex items-center space-x-reverse space-x-2">
                      <Share2 className="w-5 h-5" />
                      <span>{statement.shares} مشاركة</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div 
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: statement.content }}
                  />

                  {/* Tags */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-bold mb-4">الكلمات المفتاحية</h3>
                    <div className="flex flex-wrap gap-2">
                      {statement.tags.map((tag: string, index: number) => (
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
                    <h3 className="text-lg font-bold mb-4">شارك البيان</h3>
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

              {/* Related Statements */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-brand-dark mb-6">بيانات ذات صلة</h3>
                <div className="space-y-4">
                  {relatedStatements.map((relatedStatement) => (
                    <Link
                      key={relatedStatement.id}
                      href={`/press-statements/${relatedStatement.id}`}
                      className="block group"
                    >
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-brand transition-colors">
                        <h4 className="font-medium text-gray-800 group-hover:text-brand transition-colors line-clamp-2 mb-2">
                          {relatedStatement.title}
                        </h4>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {relatedStatement.category}
                          </span>
                          <span>{new Date(relatedStatement.date).toLocaleDateString('ar-EG')}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Back to Statements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              href="/press-statements"
              className="inline-flex items-center space-x-reverse space-x-2 bg-brand text-white px-8 py-4 rounded-full font-bold hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <ArrowRight className="w-5 h-5" />
              <span>العودة إلى البيانات الصحفية</span>
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}