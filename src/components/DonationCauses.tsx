// src/components/DonationCauses.tsx
import { useState, useEffect, useRef } from 'react';
import { CMS_API_BASE } from '../config/api';

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
    category: 'Nutrition',
    title: 'Community Food Drives',
    raised: 4250,
    goal: 5000,
    progressPercent: 85,
    imgSrc: '/img/donation-1.jpg',
    desc: 'Providing fresh, nutritious food baskets, warm meals, and pantry staples to vulnerable children and low-income families.',
  },
  {
    id: 2,
    category: 'Clean Water',
    title: 'Clean Water & Sanitation',
    raised: 2850,
    goal: 3000,
    progressPercent: 95,
    imgSrc: '/img/donation-2.jpg',
    desc: 'Distributing water filtration systems and sanitation hygiene kits to community centers lacking safe drinking water.',
  },
  {
    id: 3,
    category: 'Education',
    title: 'Youth School Supplies',
    raised: 3750,
    goal: 5000,
    progressPercent: 75,
    imgSrc: '/img/donation-3.jpg',
    desc: 'Equipping underprivileged elementary and high school students with backpacks, notebooks, uniforms, and learning tools.',
  },
];

interface DonationCausesProps {
  onSelectCause?: (causeTitle: string) => void;
  refreshKey?: number;
}

export default function DonationCauses({ onSelectCause, refreshKey = 0 }: DonationCausesProps) {
  const [causes, setCauses] = useState<CauseItem[]>(CAUSES);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch(`${CMS_API_BASE}/causes`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch causes from CMS');
        return res.json();
      })
      .then((data: CauseItem[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setCauses(data);
        }
      })
      .catch(() => {
        // Fallback already initialized from CAUSES
      });
  }, [refreshKey]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const handleDonateForCause = (causeTitle: string) => {
    if (onSelectCause) {
      onSelectCause(causeTitle);
    } else {
      const el = document.getElementById('donate');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div id="donation" ref={sectionRef} className="container-fluid py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: 550 }}>
          <p className="section-title bg-white text-center text-primary px-3">Active Causes</p>
          <h1 className="display-6 mb-3">Our Transparent Community Causes</h1>
          <p className="text-muted mb-0">Every donation directly funds verified supplies and on-the-ground support.</p>
        </div>
        <div className="row g-4">
          {causes.map((cause) => (
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
                  <span className="mb-2 fw-bold text-dark">${cause.raised.toLocaleString()}</span>

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
                        height: isVisible ? `${cause.progressPercent}%` : '0%',
                        width: '100%',
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
                  <span className="fw-bold text-dark">${cause.goal.toLocaleString()}</span>
                </div>

                {/* Content details */}
                <div className="donation-detail d-flex flex-column justify-content-between">
                  <div>
                    <div className="position-relative mb-4 overflow-hidden rounded">
                      <img 
                        className="img-fluid w-100" 
                        src={cause.imgSrc} 
                        alt={cause.title} 
                        style={{ transition: 'transform 0.5s ease', height: '180px', objectFit: 'cover' }}
                      />
                      <span className="btn btn-sm btn-secondary px-3 position-absolute top-0 end-0 m-2">
                        {cause.category}
                      </span>
                    </div>
                    <h4 className="d-inline-block mb-2">{cause.title}</h4>
                    <p className="text-muted small mb-3">{cause.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDonateForCause(cause.title)}
                    className="btn btn-primary w-100 py-3 mt-2 border-0 shadow-sm"
                  >
                    <i className="fa fa-heart me-2" />Donate to {cause.category}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
