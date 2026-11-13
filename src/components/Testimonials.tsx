import { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  image: string;
}

const REVIEWS: Testimonial[] = [
  {
    id: 1,
    text: "Working with Charitize on community feeding initiatives showed me just how effective a community-focused initiative can be. Every food package and relief drive goes directly into the hands of families who need it most.",
    name: 'Elena Ramirez',
    role: 'Community Outreach Volunteer',
    image: '/img/testimonial-1.jpg',
  },
  {
    id: 2,
    text: "What sets Charitize apart is absolute accountability. Transparent updates show exactly where funds are directed, providing clear proof of impact that gives every supporter complete peace of mind.",
    name: 'Marcus Vance',
    role: 'Recurring Supporter & Youth Mentor',
    image: '/img/testimonial-2.jpg',
  },
  {
    id: 3,
    text: "Charitize coordinated and delivered clean water supplies and elementary school packs for our local community drive with immense dedication. A wonderful initiative turning empathy and technology into real action.",
    name: 'Dr. Sofia Cruz',
    role: 'Community Health Advocate',
    image: '/img/testimonial-3.jpg',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % REVIEWS.length);
  const prev = () => setIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);

  const t = REVIEWS[index];

  return (
    <div id="testimonials" className="container-fluid py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-md-12 col-lg-4 col-xl-3">
            <p className="section-title bg-white text-start text-primary pe-3">Testimonials</p>
            <h1 className="display-6 mb-4">What Supporters Say About Our Work.</h1>
            <p className="fs-5 mb-0 text-muted">
              Honest feedback from volunteers, mentors, and community partners collaborating with our mission.
            </p>
          </div>
          <div className="col-md-12 col-lg-8 col-xl-9">
            <div className="row g-5 align-items-center">
              <div className="col-md-6">
                <img 
                  className="img-fluid w-100 rounded shadow" 
                  src={t.image} 
                  alt={t.name}
                  style={{ maxHeight: '350px', objectFit: 'cover' }}
                />
              </div>
              <div className="col-md-6">
                <div className="mb-2 text-warning">
                  <i className="fa fa-star me-1" />
                  <i className="fa fa-star me-1" />
                  <i className="fa fa-star me-1" />
                  <i className="fa fa-star me-1" />
                  <i className="fa fa-star" />
                </div>
                <p className="fs-5 text-dark" style={{ lineHeight: '1.7' }}>"{t.text}"</p>
                <div className="d-flex align-items-center mt-4">
                  <div className="btn-lg-square bg-light text-secondary flex-shrink-0 d-flex align-items-center justify-content-center p-3 rounded">
                    <i className="fa fa-quote-right fa-2x text-primary" />
                  </div>
                  <div className="ps-3">
                    <h5 className="mb-0 fw-bold">{t.name}</h5>
                    <span className="text-muted small">{t.role}</span>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-4">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary btn-sm px-3 py-2" 
                    onClick={prev}
                    aria-label="Previous review"
                  >
                    <i className="fa-solid fa-chevron-left" />
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary btn-sm px-3 py-2" 
                    onClick={next}
                    aria-label="Next review"
                  >
                    <i className="fa-solid fa-chevron-right" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
