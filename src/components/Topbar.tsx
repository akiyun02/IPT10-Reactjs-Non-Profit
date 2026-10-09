// src/components/Topbar.tsx
export default function Topbar() {
  return (
    <div className="container-fluid bg-secondary top-bar py-3">
      <div className="row align-items-center h-100">
        <div className="col-lg-4 text-center text-lg-start">
          <a href="/" className="text-decoration-none">
            <h1 className="display-5 text-primary m-0 fw-bold">Charitize</h1>
          </a>
        </div>
        <div className="col-lg-8 d-none d-lg-block">
          <div className="row justify-content-end">
            <div className="col-lg-4">
              <div className="d-flex align-items-center justify-content-end">
                <div className="flex-shrink-0 btn-square bg-primary d-flex align-items-center justify-content-center" style={{ width: 45, height: 45 }}>
                  <i className="fa-solid fa-phone text-dark fs-5" />
                </div>
                <div className="ms-3 text-start">
                  <h6 className="text-primary mb-0">Call Us</h6>
                  <span className="text-white">+012 345 6789</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="d-flex align-items-center justify-content-end">
                <div className="flex-shrink-0 btn-square bg-primary d-flex align-items-center justify-content-center" style={{ width: 45, height: 45 }}>
                  <i className="fa-solid fa-envelope-open text-dark fs-5" />
                </div>
                <div className="ms-3 text-start">
                  <h6 className="text-primary mb-0">Mail Us</h6>
                  <span className="text-white">info@domain.com</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="d-flex align-items-center justify-content-end">
                <div className="flex-shrink-0 btn-square bg-primary d-flex align-items-center justify-content-center" style={{ width: 45, height: 45 }}>
                  <i className="fa-solid fa-location-dot text-dark fs-5" />
                </div>
                <div className="ms-3 text-start">
                  <h6 className="text-primary mb-0">Address</h6>
                  <span className="text-white">123 Street, NY, USA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}