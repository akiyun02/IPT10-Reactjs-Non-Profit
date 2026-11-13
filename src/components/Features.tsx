import { useState, useEffect, useRef } from 'react';

interface CounterProps {
  target: number;
  suffix?: string;
}

function AnimatedCounter({ target, suffix = '' }: CounterProps) {
  const [count, setCount] = useState<number>(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    const el = elementRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const duration = 2000;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasStarted, target]);

  return (
    <span ref={elementRef}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

interface FeaturesProps {
  onNavigate?: (page: 'home' | 'about') => void;
}

export default function Features({ onNavigate }: FeaturesProps) {
  const handleDonateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) onNavigate('home');
    setTimeout(() => {
      const el = document.getElementById('donate');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleLearnMoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="features" className="container-fluid py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="rounded overflow-hidden">
              <div className="row g-0">
                <div className="col-sm-6">
                  <div className="text-center bg-primary py-5 px-4 h-100">
                    <i className="fa fa-users fa-3x text-secondary mb-3" />
                    <h1 className="display-5 mb-0">
                      <AnimatedCounter target={250} suffix="+" />
                    </h1>
                    <span className="text-dark fw-bold">Active Supporters</span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="text-center bg-secondary py-5 px-4 h-100">
                    <i className="fa fa-hand-holding-heart fa-3x text-primary mb-3" />
                    <h1 className="display-5 text-white mb-0">
                      <AnimatedCounter target={15} suffix="+" />
                    </h1>
                    <span className="text-white">Community Drives</span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="text-center bg-secondary py-5 px-4 h-100">
                    <i className="fa fa-box-open fa-3x text-primary mb-3" />
                    <h1 className="display-5 text-white mb-0">
                      <AnimatedCounter target={1200} suffix="+" />
                    </h1>
                    <span className="text-white">Care Kits & Meals</span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="text-center bg-primary py-5 px-4 h-100">
                    <i className="fa fa-shield-halved fa-3x text-secondary mb-3" />
                    <h1 className="display-5 mb-0">
                      <AnimatedCounter target={100} suffix="%" />
                    </h1>
                    <span className="text-dark fw-bold">Direct Transparency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <p className="section-title bg-white text-start text-primary pe-3">Why Support Us</p>
            <h1 className="display-6 mb-4">Why Back Our Non-Profit Initiative?</h1>
            <p className="mb-4">
              Charitize cuts through bureaucratic overhead. As an agile, student-led initiative, we prioritize immediate, accountable relief directly delivered to communities that need it most.
            </p>
            <p className="text-dark">
              <i className="fa fa-check text-primary me-2" />
              100% transparent fund utilization with public distribution tracking.
            </p>
            <p className="text-dark">
              <i className="fa fa-check text-primary me-2" />
              Grassroots community aid focused on child nutrition and school supplies.
            </p>
            <p className="text-dark">
              <i className="fa fa-check text-primary me-2" />
              Secure donation checkout backed by industry-standard Stripe encryption.
            </p>
            <div className="d-flex mt-4 gap-3">
              <button
                type="button"
                onClick={handleDonateClick}
                className="btn btn-primary py-3 px-4 shadow-sm"
              >
                Donate Now
              </button>
              <button
                type="button"
                onClick={handleLearnMoreClick}
                className="btn btn-secondary py-3 px-4 shadow-sm"
              >
                About My Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
