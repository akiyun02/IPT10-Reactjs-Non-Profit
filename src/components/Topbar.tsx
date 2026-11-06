// src/components/Topbar.tsx

interface TopbarProps {
  onNavigate?: (page: 'home' | 'about') => void;
}

export default function Topbar({ onNavigate }: TopbarProps) {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container-fluid bg-secondary top-bar py-3">
      <div className="row align-items-center h-100">
        <div className="col-lg-4 text-center text-lg-start">
          <button
            type="button"
            onClick={handleLogoClick}
            className="btn btn-link text-decoration-none p-0 border-0"
          >
            <h1 className="display-5 text-primary m-0 fw-bold">Charitize</h1>
          </button>
        </div>
        <div className="col-lg-8 d-none d-lg-block">
          <div className="row justify-content-end">
            <div className="col-lg-4">
              <div className="d-flex align-items-center justify-content-end">
                <a
                  href="tel:+0123456789"
                  className="flex-shrink-0 btn-square bg-primary d-flex align-items-center justify-content-center text-decoration-none"
                  style={{ width: 45, height: 45 }}
                  aria-label="Call Phone Number"
                >
                  <i className="fa-solid fa-phone text-dark fs-5" />
                </a>
                <div className="ms-3 text-start">
                  <h6 className="text-primary mb-0">Call Us</h6>
                  <a href="tel:+0123456789" className="text-white text-decoration-none small">
                    +012 345 6789
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="d-flex align-items-center justify-content-end">
                <a
                  href="mailto:Bacron07@gmail.com"
                  className="flex-shrink-0 btn-square bg-primary d-flex align-items-center justify-content-center text-decoration-none"
                  style={{ width: 45, height: 45 }}
                  aria-label="Send Email"
                >
                  <i className="fa-solid fa-envelope-open text-dark fs-5" />
                </a>
                <div className="ms-3 text-start">
                  <h6 className="text-primary mb-0">Mail Us</h6>
                  <a href="mailto:Bacron07@gmail.com" className="text-white text-decoration-none small">
                    Bacron07@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="d-flex align-items-center justify-content-end">
                <div
                  className="flex-shrink-0 btn-square bg-primary d-flex align-items-center justify-content-center"
                  style={{ width: 45, height: 45 }}
                >
                  <i className="fa-solid fa-location-dot text-dark fs-5" />
                </div>
                <div className="ms-3 text-start">
                  <h6 className="text-primary mb-0">Address</h6>
                  <span className="text-white small">123 Street, NY, USA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}