@@ .. @@
 import React from 'react';
 import { motion } from 'framer-motion';
 import { Calendar, ArrowLeft, Eye } from 'lucide-react';
-import { Link } from 'react-router-dom';
+import Link from 'next/link';
 import Carousel from '../ui/Carousel';
-import articlesData from '../../data/articles.json';
+import articlesData from '../data/articles.json';

 const LatestArticles = () => {
@@ .. @@
         <Link
-          to={`/article/${article.id}`}
+          href={`/articles/${article.id}`}
           className="flex items-center space-x-reverse space-x-2 text-brand font-medium hover:text-brand-dark transition-colors group"
@@ .. @@
          <Link
-            to="/articles"
+            href="/articles"
             className="bg-brand text-white px-8 py-4 rounded-full font-bold hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"