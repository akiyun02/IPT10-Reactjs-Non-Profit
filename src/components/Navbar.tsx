// src/components/Navbar.tsx
import { useState, useEffect } from 'react';

interface NavbarProps {
  currentPage?: 'home' | 'about';
  onNavigate?: (page: 'home' | 'about') => void;
}

export default function Navbar({ currentPage = 'home', onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
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
           {/*   <a href="#donation" className="nav-item nav-link">Donation</a>

              <div className="nav-item dropdown position-relative">
                <button
                  type="button"
                  className="nav-link dropdown-toggle bg-transparent border-0 d-flex align-items-center"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Pages
                </button>
                <div className={`dropdown-menu bg-light m-0 ${dropdownOpen ? 'show' : ''}`}>
                  <a href="#features" className="dropdown-item">Feature</a>
                  <a href="#team" className="dropdown-item">Our Team</a>
                  <a href="#testimonials" className="dropdown-item">Testimonial</a>
                </div>
              </div>
*/}
              {/*<a href="#contact" className="nav-item nav-link">Contact</a>*/}
            </div>

            <div className="d-none d-lg-flex ms-auto">
              <a className="btn btn-square btn-dark ms-2 d-flex align-items-center justify-content-center" href="#"><i className="fab fa-x-twitter" /></a>
              <a className="btn btn-square btn-dark ms-2 d-flex align-items-center justify-content-center" href="#"><i className="fab fa-facebook-f" /></a>
              <a className="btn btn-square btn-dark ms-2 d-flex align-items-center justify-content-center" href="#"><i className="fab fa-youtube" /></a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}