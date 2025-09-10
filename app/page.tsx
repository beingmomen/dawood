'use client';

import React from 'react';
import Hero from './components/sections/Hero';
import Achievements from './components/sections/Achievements';
import LatestArticles from './components/sections/LatestArticles';
import MediaTabs from './components/sections/MediaTabs';
import Activities from './components/sections/Activities';
import MediaCoverage from './components/sections/MediaCoverage';
import PressStatements from './components/sections/PressStatements';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import BackToTop from './components/ui/BackToTop';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Achievements />
        <LatestArticles />
        <MediaTabs />
        <Activities />
        <PressStatements />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}