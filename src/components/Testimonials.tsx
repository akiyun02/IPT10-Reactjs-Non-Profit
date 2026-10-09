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
    text: 'Education is the foundation of change. By funding schools, scholarships, and training programs, we can help children and adults unlock their potential for a better future.',
    name: 'Alexander Bell',
    role: 'CEO, Founder',
    image: '/img/testimonial-1.jpg',
  },
  {
    id: 2,
    text: 'Every hand extended in kindness brings us closer to a world free from suffering. Be part of a global movement dedicated to building a future where equality and compassion thrive.',
    name: 'Donald Pakura',
    role: 'CEO, Founder',
    image: '/img/testimonial-2.jpg',
  },
  {
    id: 3,
    text: 'Love and compassion have the power to heal. Through your donations and volunteer work, we can spread kindness and support to children, families, and communities struggling to find stability.',
    name: 'Boris Johnson',
    role: 'CEO, Founder',
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
    <div className="container-fluid py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-md-12 col-lg-4 col-xl-3">
            <h1 className="display-6 mb-4">What People Say About Our Activities.</h1>
            <p className="fs-5 mb-0 text-muted">We work to bring smiles, hope, and a brighter future to those in need.</p>
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
                <p className="fs-5">{t.text}</p>
                <div className="d-flex align-items-center mt-4">
                  <div className="btn-lg-square bg-light text-secondary flex-shrink-0 d-flex align-items-center justify-content-center p-3">
                    <i className="fa fa-quote-right fa-2x" />
                  </div>
                  <div className="ps-3">
                    <h5 className="mb-0">{t.name}</h5>
                    <span>{t.role}</span>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-4">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary btn-sm" 
                    onClick={prev}
                    aria-label="Previous review"
                  >
                    <i className="bi bi-chevron-left" />
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary btn-sm" 
                    onClick={next}
                    aria-label="Next review"
                  >
                    <i className="bi bi-chevron-right" />
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