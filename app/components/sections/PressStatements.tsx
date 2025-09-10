@@ .. @@
 import React from 'react';
 import { motion } from 'framer-motion';
 import { Calendar, FileText, ArrowLeft } from 'lucide-react';
-import { Link } from 'react-router-dom';
+import Link from 'next/link';

 const PressStatements = () => {
 }
@@ .. @@
                   <Link
-                    to={`/press-statement/${statement.id}`}
+                    href={`/press-statements/${statement.id}`}
                     className="flex items-center space-x-reverse space-x-2 text-brand font-medium hover:text-brand-dark transition-colors group"
@@ .. @@
          <Link
-            to="/press-statements"
+            href="/press-statements"
             className="bg-brand text-white px-8 py-4 rounded-full font-bold hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"