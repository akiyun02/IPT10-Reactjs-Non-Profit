import { useState, useEffect } from 'react';
import { CMS_API_BASE } from '../config/api';

interface FooterProps {
  onNavigate?: (page: 'home' | 'about') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [infoModalMessage, setInfoModalMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!infoModalMessage) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setInfoModalMessage(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [infoModalMessage]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const email = newsletterEmail.trim();
    if (email) {
      fetch(`${CMS_API_BASE}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }).catch(() => {
        // Non-blocking if CMS API is offline
      });
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleNavigateTo = (page: 'home' | 'about', hash?: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Newsletter */}
      <div className="container-fluid bg-primary py-5 mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 text-center">
              <h1 className="display-6 mb-3">Stay Connected with Our Mission</h1>
              <p className="text-dark mb-4">
                Receive direct updates on food deliveries, outreach drives, and community milestones.
              </p>
              {subscribed ? (
                <div className="alert alert-light py-3 px-4 shadow-sm mb-2 text-dark fw-bold">
                  <i className="fa fa-check-circle text-success me-2" />
                  Thank you! You have successfully subscribed to community updates.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="position-relative w-100 mb-2">
                  <input
                    className="form-control border-0 w-100 ps-4 pe-5 rounded"
                    type="email"
                    placeholder="Enter your email address"
                    style={{ height: '60px' }}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="btn btn-lg-square shadow-none position-absolute top-0 end-0 mt-2 me-2"
                    aria-label="Subscribe"
                  >
                    <i className="fa fa-paper-plane text-primary fs-4" />
                  </button>
                </form>
              )}
              <p className="mb-0 text-white-50 small">Zero spam. Only meaningful mission updates.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer id="contact" className="container-fluid footer py-5">
        <div className="container">
          <div className="row g-5 py-5">
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Get In Touch</h4>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3 text-primary" />
                Metro Manila, Philippines
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3 text-primary" />
                <a href="tel:+639175550199" className="text-white-50 text-decoration-none">
                  +63 917 555 0199
                </a>
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3 text-primary" />
                <a href="mailto:Bacron07@gmail.com" className="text-white-50 text-decoration-none">
                  Charitize@gmail.com
                </a>
              </p>
              <div className="d-flex pt-3">
                <a
                  className="btn btn-square btn-primary me-2 text-white"
                  href="https://github.com/akiyun02"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                >
                  <i className="fab fa-github" />
                </a>
                <a
                  className="btn btn-square btn-primary me-2 text-white"
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                >
                  <i className="fab fa-x-twitter" />
                </a>
                <a
                  className="btn btn-square btn-primary me-2 text-white"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  className="btn btn-square btn-primary me-2 text-white"
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <i className="fab fa-youtube" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Quick Links</h4>
              <button
                type="button"
                className="btn btn-link text-white-50 text-decoration-none d-block p-0 mb-2 border-0 text-start"
                onClick={() => handleNavigateTo('about')}
              >
                &rsaquo; About the Mission
              </button>
              <button
                type="button"
                className="btn btn-link text-white-50 text-decoration-none d-block p-0 mb-2 border-0 text-start"
                onClick={() => handleNavigateTo('home', 'donation')}
              >
                &rsaquo; Active Causes
              </button>
              <button
                type="button"
                className="btn btn-link text-white-50 text-decoration-none d-block p-0 mb-2 border-0 text-start"
                onClick={() => handleNavigateTo('home', 'features')}
              >
                &rsaquo; Why Support Us
              </button>
              <button
                type="button"
                className="btn btn-link text-white-50 text-decoration-none d-block p-0 mb-2 border-0 text-start"
                onClick={() => handleNavigateTo('home', 'team')}
              >
                &rsaquo; Our Team
              </button>
              <button
                type="button"
                className="btn btn-link text-white-50 text-decoration-none d-block p-0 mb-2 border-0 text-start"
                onClick={() => handleNavigateTo('home', 'donate')}
              >
                &rsaquo; Donate Now
              </button>
              <button
                type="button"
                className="btn btn-link text-white-50 text-decoration-none d-block p-0 mb-2 border-0 text-start"
                onClick={() => setInfoModalMessage('Terms & Conditions: Charitize is operated as an independent non-profit and educational initiative. 100% of received funds support community pantry drives, clean water access, and school aid.')}
              >
                &rsaquo; Terms &amp; Transparency
              </button>
              <button
                type="button"
                className="btn btn-link text-white-50 text-decoration-none d-block p-0 mb-2 border-0 text-start"
                onClick={() => setInfoModalMessage('Support & Inquiries: For partnerships, questions, or supply donations, contact our team directly at Bacron07@gmail.com or +63 917 555 0199.')}
              >
                &rsaquo; Support &amp; FAQ
              </button>

            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Active Hours</h4>
              <p className="mb-1 text-white-50">Monday - Friday</p>
              <h6 className="text-light">08:00 am - 06:00 pm</h6>
              <p className="mb-1 text-white-50">Saturday (Community Drives)</p>
              <h6 className="text-light">09:00 am - 04:00 pm</h6>
              <p className="mb-1 text-white-50">Sunday</p>
              <h6 className="text-light">Emergency Relief Standby</h6>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Outreach Gallery</h4>
              <div className="row g-2">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="col-4">
                    <img className="img-fluid w-100 rounded" src={`/img/gallery-${num}.jpg`} alt={`Community Outreach ${num}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="copyright pt-5 border-top border-secondary">
            <div className="row">
              <div className="col-md-7 text-center text-md-start mb-3 mb-md-0 text-white-50">
                &copy;{' '}
                <button
                  type="button"
                  onClick={() => handleNavigateTo('home')}
                  className="btn btn-link fw-semi-bold text-white text-decoration-none p-0 border-0"
                >
                  Charitize
                </button>
                , All Rights Reserved. Independent Community Non-Profit Initiative.
              </div>
              <div className="col-md-5 text-center text-md-end text-white-50">
                Open Philanthropy Platform &bull; Built with React &amp; Stripe
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Info Modal */}
      {infoModalMessage && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050 }}
          role="dialog"
          onClick={() => setInfoModalMessage(null)}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Information</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setInfoModalMessage(null)}
                  aria-label="Close"
                />
              </div>
              <div className="modal-body p-4">
                <p className="mb-0 text-dark" style={{ lineHeight: '1.6' }}>{infoModalMessage}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setInfoModalMessage(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
