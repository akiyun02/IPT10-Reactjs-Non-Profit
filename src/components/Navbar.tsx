// src/components/Navbar.tsx
import { useState, useEffect } from 'react';

interface NavbarProps {
  currentPage?: 'home' | 'about';
  onNavigate?: (page: 'home' | 'about') => void;
}

export default function Navbar({ currentPage = 'home', onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Used only for visual changes (e.g. shrinking padding or shadow)
      setIsScrolled(window.scrollY > 90);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: 'home' | 'about') => {
    if (onNavigate) onNavigate(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionScroll = (sectionId: string) => {
    setIsOpen(false);
    if (currentPage !== 'home' && onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="container-fluid bg-secondary px-0"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1020,
        boxShadow: isScrolled ? '0 4px 15px rgba(0, 0, 0, 0.15)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        className="nav-bar"
        style={{
          padding: isScrolled ? '0 0px' : '0 45px',
          transition: 'padding 0.3s ease',
        }}
      >
        <nav className="navbar navbar-expand-lg bg-primary navbar-dark px-4 py-lg-0">
          <h4 className="d-lg-none m-0 text-white">Menu</h4>

          <button
            type="button"
            className="navbar-toggler me-0"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`collapse navbar-collapse d-lg-flex ${isOpen ? 'show d-block' : ''}`} id="navbarCollapse">
            <div className="navbar-nav me-auto">
              <button
                type="button"
                className={`nav-item nav-link btn btn-link text-start text-decoration-none ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                Home
              </button>
              <button
                type="button"
                className={`nav-item nav-link btn btn-link text-start text-decoration-none ${currentPage === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                About
              </button>
              <button
                type="button"
                className="nav-item nav-link btn btn-link text-start text-decoration-none"
                onClick={() => handleSectionScroll('donation')}
              >
                Causes
              </button>
              <button
                type="button"
                className="nav-item nav-link btn btn-link text-start text-decoration-none"
                onClick={() => handleSectionScroll('features')}
              >
                Why Us
              </button>
              <button
                type="button"
                className="nav-item nav-link btn btn-link text-start text-decoration-none"
                onClick={() => handleSectionScroll('team')}
              >
                Team
              </button>
              <button
                type="button"
                className="nav-item nav-link btn btn-link text-start text-decoration-none"
                onClick={() => handleSectionScroll('testimonials')}
              >
                Testimonials
              </button>
              <button
                type="button"
                className="nav-item nav-link btn btn-link text-start text-decoration-none"
                onClick={() => handleSectionScroll('contact')}
              >
                Contact
              </button>
            </div>

            <div className="d-flex align-items-center ms-auto py-2 py-lg-0">
              <button
                type="button"
                onClick={() => handleSectionScroll('donate')}
                className="btn btn-secondary px-3 py-2 me-3 fw-bold shadow-sm d-flex align-items-center"
              >
                <i className="fa-solid fa-heart me-2 text-primary" />
                Donate
              </button>
              <div className="d-none d-lg-flex">
                <a
                  className="btn btn-square btn-dark ms-2 d-flex align-items-center justify-content-center"
                  href="https://github.com/akiyun02"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                >
                  <i className="fab fa-github" />
                </a>
                <a
                  className="btn btn-square btn-dark ms-2 d-flex align-items-center justify-content-center"
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                >
                  <i className="fab fa-x-twitter" />
                </a>
                <a
                  className="btn btn-square btn-dark ms-2 d-flex align-items-center justify-content-center"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  className="btn btn-square btn-dark ms-2 d-flex align-items-center justify-content-center"
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <i className="fab fa-youtube" />
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
