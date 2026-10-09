export default function Footer() {
  return (
    <>
      {/* Newsletter */}
      <div className="container-fluid bg-primary py-5 mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 text-center">
              <h1 className="display-6 mb-4">Subscribe the Newsletter</h1>
              <div className="position-relative w-100 mb-2">
                <input 
                  className="form-control border-0 w-100 ps-4 pe-5" 
                  type="email" 
                  placeholder="Enter Your Email" 
                  style={{ height: '60px' }} 
                />
                <button 
                  type="button" 
                  className="btn btn-lg-square shadow-none position-absolute top-0 end-0 mt-2 me-2"
                  aria-label="Subscribe"
                >
                  <i className="fa fa-paper-plane text-primary fs-4" />
                </button>
              </div>
              <p className="mb-0">Don't worry, we won't spam you with emails.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="container-fluid footer py-5">
        <div className="container">
          <div className="row g-5 py-5">
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Our Office</h4>
              <p className="mb-2"><i className="fa fa-map-marker-alt me-3" />123 Street, New York, USA</p>
              <p className="mb-2"><i className="fa fa-phone-alt me-3" />+012 345 67890</p>
              <p className="mb-2"><i className="fa fa-envelope me-3" />info@example.com</p>
              <div className="d-flex pt-3">
                <a className="btn btn-square btn-primary me-2" href="#"><i className="fab fa-x-twitter" /></a>
                <a className="btn btn-square btn-primary me-2" href="#"><i className="fab fa-facebook-f" /></a>
                <a className="btn btn-square btn-primary me-2" href="#"><i className="fab fa-youtube" /></a>
                <a className="btn btn-square btn-primary me-2" href="#"><i className="fab fa-linkedin-in" /></a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Quick Links</h4>
              <a className="btn btn-link text-decoration-none d-block p-0 mb-2" href="#about">About Us</a>
              <a className="btn btn-link text-decoration-none d-block p-0 mb-2" href="#contact">Contact Us</a>
              <a className="btn btn-link text-decoration-none d-block p-0 mb-2" href="#donation">Our Causes</a>
              <a className="btn btn-link text-decoration-none d-block p-0 mb-2" href="#">Terms & Conditions</a>
              <a className="btn btn-link text-decoration-none d-block p-0 mb-2" href="#">Support</a>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Business Hours</h4>
              <p className="mb-1">Monday - Friday</p>
              <h6 className="text-light">09:00 am - 07:00 pm</h6>
              <p className="mb-1">Saturday</p>
              <h6 className="text-light">09:00 am - 12:00 pm</h6>
              <p className="mb-1">Sunday</p>
              <h6 className="text-light">Closed</h6>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Gallery</h4>
              <div className="row g-2">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="col-4">
                    <img className="img-fluid w-100" src={`/img/gallery-${num}.jpg`} alt={`Gallery ${num}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="copyright pt-5">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0 text-white-50">
                &copy; <a className="fw-semi-bold text-white" href="#">Charitize</a>, All Rights Reserved.
              </div>
              <div className="col-md-6 text-center text-md-end text-white-50">
                Designed By <a className="fw-semi-bold text-white" href="https://htmlcodex.com">HTML Codex</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}