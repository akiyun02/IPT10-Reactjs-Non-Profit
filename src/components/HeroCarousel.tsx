import { useState, useEffect } from 'react';

interface Slide {
  id: number;
  title: string;
  desc: string;
  image: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: 'Together for a Better Tomorrow',
    desc: 'We believe in creating opportunities and empowering communities through education, healthcare, and sustainable development.',
    image: '/img/carousel-1.jpg',
  },
  {
    id: 2,
    title: 'Together, We Can End Hunger',
    desc: 'No one should go to bed hungry. Your support helps us bring smiles, hope, and a brighter future to those in need.',
    image: '/img/carousel-2.jpg',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  const slide = SLIDES[current];

  return (
    <div className="container-fluid p-0 bg-light position-relative overflow-hidden">
      <div className="container py-5">
        <div className="row g-5 align-items-center py-5">
          <div className="col-lg-6">
            <div className="carousel-text">
              <h1 className="display-1 text-uppercase mb-3">{slide.title}</h1>
              <p className="fs-5 mb-5">{slide.desc}</p>
              <div className="d-flex">
                <a className="btn btn-primary py-3 px-4 me-3" href="#donate">Donate Now</a>
                <a className="btn btn-secondary py-3 px-4" href="#about">Join Us Now</a>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="carousel-img text-center">
              <img 
                className="w-100" 
                src={slide.image} 
                alt={slide.title} 
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Prev / Next Buttons */}
      <button
        type="button"
        onClick={prevSlide}
        className="btn btn-dark position-absolute top-50 start-0 translate-middle-y ms-3 d-flex align-items-center justify-content-center"
        style={{ width: '45px', height: '45px', borderRadius: '50%', zIndex: 10 }}
        aria-label="Previous slide"
      >
        <i className="bi bi-chevron-left" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="btn btn-dark position-absolute top-50 end-0 translate-middle-y me-3 d-flex align-items-center justify-content-center"
        style={{ width: '45px', height: '45px', borderRadius: '50%', zIndex: 10 }}
        aria-label="Next slide"
      >
        <i className="bi bi-chevron-right" />
      </button>

      {/* Dots Indicator */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2">
        {SLIDES.map((s, index) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setCurrent(index)}
            className={`border-0 rounded-circle ${current === index ? 'bg-primary' : 'bg-secondary'}`}
            style={{ width: '12px', height: '12px', cursor: 'pointer' }}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}