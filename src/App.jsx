import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import BackToTop from './components/ui/BackToTop';

// Pages
import HomePage from './pages/HomePage';
import AllArticlesPage from './pages/AllArticlesPage';
import ArticlePage from './pages/ArticlePage';
import CVPage from './pages/CVPage';
import MediaPage from './pages/MediaPage';
import EventPage from './pages/EventPage';
import PressStatementsPage from './pages/PressStatementsPage';
import MediaCoveragePage from './pages/MediaCoveragePage';
import PressStatementPage from './pages/PressStatementPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import DisclaimerPage from './pages/DisclaimerPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<AllArticlesPage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/cv" element={<CVPage />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="/press-statements" element={<PressStatementsPage />} />
            <Route path="/press-statement/:id" element={<PressStatementPage />} />
            <Route path="/media-coverage" element={<MediaCoveragePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;