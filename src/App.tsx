// src/App.tsx
import { useState } from 'react';
import './styles/bootstrap.min.css';
import './styles/style.css';

import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import VideoBanner from './components/VideoBanner';
import About from './components/About';
import Features from './components/Features';
import DonationCauses from './components/DonationCauses';
import DonateForm from './components/DonateForm';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AboutUsPage from './pages/AboutUsPage';
import BackToTop from './components/BackToTop';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
  const [selectedCause, setSelectedCause] = useState<string>('');

  const handleSelectCause = (causeTitle: string) => {
    setSelectedCause(causeTitle);
    const el = document.getElementById('donate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="charitize-app">
      <Topbar onNavigate={setCurrentPage} />
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main>
        {currentPage === 'home' ? (
          <>
            <HeroCarousel onNavigate={setCurrentPage} />
            <VideoBanner />
            <About onNavigate={setCurrentPage} />
            <Features onNavigate={setCurrentPage} />
            <DonationCauses onSelectCause={handleSelectCause} />
            <DonateForm selectedCause={selectedCause} onClearCause={() => setSelectedCause('')} />
            <Team onNavigate={setCurrentPage} />
            <Testimonials />
          </>
        ) : (
          <AboutUsPage onNavigate={setCurrentPage} />
        )}
      </main>
      <BackToTop />
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}