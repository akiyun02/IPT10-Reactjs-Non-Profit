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

  return (
    <div className="charitize-app">
      <Topbar />
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main>
        {currentPage === 'home' ? (
          <>
            <HeroCarousel />
            <VideoBanner />
            <About />
            <Features />
            <DonationCauses />
            <DonateForm />
            <Team />
            <Testimonials />
          </>
        ) : (
          <AboutUsPage />
        )}
      </main>
      <BackToTop/>
      <Footer />
    </div>
  );
}