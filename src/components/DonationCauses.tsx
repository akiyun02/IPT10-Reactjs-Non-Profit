// src/components/DonationCauses.tsx
import { useState, useEffect, useRef } from 'react';

interface CauseItem {
  id: number;
  category: string;
  title: string;
  raised: number;
  goal: number;
  progressPercent: number;
  imgSrc: string;
  desc: string;
}

const CAUSES: CauseItem[] = [
  {
    id: 1,
    category: 'Food',
    title: 'Healthy Food',
    raised: 8000,
    goal: 10000,
    progressPercent: 85,
    imgSrc: '/img/donation-1.jpg',
    desc: 'Through your donations and volunteer work, we spread kindness and support to children.',
  },
  {
    id: 2,
    category: 'Health',
    title: 'Water Treatment',
    raised: 8000,
    goal: 10000,
    progressPercent: 95,
    imgSrc: '/img/donation-2.jpg',
    desc: 'Through your donations and volunteer work, we spread kindness and support to children.',
  },
  {
    id: 3,
    category: 'Education',
    title: 'Education Support',
    raised: 8000,
    goal: 10000,
    progressPercent: 75,
    imgSrc: '/img/donation-3.jpg',
    desc: 'Through your donations and volunteer work, we spread kindness and support to children.',
  },
];

export default function DonationCauses() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 } // Triggers when 25% of the section enters the screen
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div id="donation" ref={sectionRef} className="container-fluid py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: 500 }}>
          <p className="section-title bg-white text-center text-primary px-3">Donation</p>
          <h1 className="display-6 mb-4">Our Donation Causes Around the World</h1>
        </div>
        <div className="row g-4">
          {CAUSES.map((cause) => (
            <div key={cause.id} className="col-md-6 col-lg-4">
              <div 
                className="donation-item d-flex h-100 p-4 bg-white rounded shadow-sm"
                style={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                {/* Vertical Progress Bar Column */}
                <div 
                  className="donation-progress d-flex flex-column flex-shrink-0 text-center me-4"
                  style={{ width: '65px' }}
                >
                  <h6 className="mb-0 small text-muted">Raised</h6>
                  <span className="mb-2 fw-bold text-dark">${cause.raised}</span>

                  {/* Outer track */}
                  <div 
                    className="progress bg-light mb-2 d-flex flex-column justify-content-end" 
                    style={{ 
                      height: '180px', 
                      width: '100%', 
                      borderRadius: '6px', 
                      overflow: 'hidden' 
                    }}
                  >
                    {/* Animated vertical fill */}
                    <div 
                      className="progress-bar bg-secondary d-flex align-items-center justify-content-center" 
                      role="progressbar" 
                      style={{ 
                        // Animate height from 0% to target percent
                        height: isVisible ? `${cause.progressPercent}%` : '0%',
                        width: '100%',
                        // Cubic-bezier for an energetic rise animation
                        transition: 'height 1.4s cubic-bezier(0.25, 1, 0.5, 1)',
                      }}
                      aria-valuenow={cause.progressPercent} 
                      aria-valuemin={0} 
                      aria-valuemax={100}
                    >
                      <span 
                        className="fs-6 fw-bold text-white"
                        style={{
                          opacity: isVisible ? 1 : 0,
                          transition: 'opacity 0.6s ease 0.4s',
                        }}
                      >
                        {cause.progressPercent}%
                      </span>
                    </div>
                  </div>

                  <h6 className="mb-0 small text-muted">Goal</h6>
                  <span className="fw-bold text-dark">${cause.goal}</span>
                </div>

                {/* Content details */}
                <div className="donation-detail d-flex flex-column justify-content-between">
                  <div>
                    <div className="position-relative mb-4 overflow-hidden rounded">
                      <img 
                        className="img-fluid w-100" 
                        src={cause.imgSrc} 
                        alt={cause.title} 
                        style={{ transition: 'transform 0.5s ease' }}
                      />
                      <span className="btn btn-sm btn-secondary px-3 position-absolute top-0 end-0 m-2">
                        {cause.category}
                      </span>
                    </div>
                    <h3 className="d-inline-block mb-2">{cause.title}</h3>
                    <p className="text-muted">{cause.desc}</p>
                  </div>
                  <a href="#donate" className="btn btn-primary w-100 py-3 mt-3">
                    <i className="fa fa-plus me-2" />Donate Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}