@@ .. @@
 import React, { useState, useEffect } from 'react';
 import { Menu, X, FileText, User, Camera, Phone, Home } from 'lucide-react';
 import { motion, AnimatePresence } from 'framer-motion';
-import { Link, useLocation } from 'react-router-dom';
+import Link from 'next/link';
+import { usePathname } from 'next/navigation';

 const Header = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isScrolled, setIsScrolled] = useState(false);
-  const location = useLocation();
+  const pathname = usePathname();

   useEffect(() => {
@@ .. @@
     { name: 'البيانات الصحفية', href: '/press-statements', icon: FileText },
   ];

-  const isHomePage = location.pathname === '/';
+  const isHomePage = pathname === '/';

   return (
@@ .. @@
                 className={`font-medium transition-colors duration-300 px-3 py-2 rounded-lg ${
-                  location.pathname === item.href
+                  pathname === item.href
                     ? 'text-white bg-brand'
                     : isScrolled || !isHomePage
                     ? 'text-gray-700 hover:text-brand hover:bg-gray-50' 
@@ .. @@
                     className={`flex items-center space-x-reverse space-x-3 py-3 px-3 rounded-lg transition-colors ${
-                      location.pathname === item.href
+                      pathname === item.href
                         ? 'text-white bg-brand'
                         : 'text-gray-700 hover:text-brand hover:bg-gray-50'