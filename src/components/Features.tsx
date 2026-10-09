import { useState, useEffect, useRef } from 'react';

interface CounterProps {
  target: number;
}

function AnimatedCounter({ target }: CounterProps) {
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

  return <span ref={elementRef}>{count}</span>;
}

export default function Features() {
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
                      <AnimatedCounter target={500} />
                    </h1>
                    <span className="text-dark">Team Members</span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="text-center bg-secondary py-5 px-4 h-100">
                    <i className="fa fa-award fa-3x text-primary mb-3" />
                    <h1 className="display-5 text-white mb-0">
                      <AnimatedCounter target={70} />
                    </h1>
                    <span className="text-white">Award Winning</span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="text-center bg-secondary py-5 px-4 h-100">
                    <i className="fa fa-list-check fa-3x text-primary mb-3" />
                    <h1 className="display-5 text-white mb-0">
                      <AnimatedCounter target={3000} />
                    </h1>
                    <span className="text-white">Total Projects</span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="text-center bg-primary py-5 px-4 h-100">
                    <i className="fa fa-comments fa-3x text-secondary mb-3" />
                    <h1 className="display-5 mb-0">
                      <AnimatedCounter target={7000} />
                    </h1>
                    <span className="text-dark">Client's Review</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <p className="section-title bg-white text-start text-primary pe-3">Why Us!</p>
            <h1 className="display-6 mb-4">Few Reasons Why People Choosing Us!</h1>
            <p className="mb-4">
              We believe in creating opportunities and empowering communities through education, healthcare, and sustainable development. Your support helps us bring smiles, hope, and a brighter future to those in need.
            </p>
            <p className="text-dark"><i className="fa fa-check text-primary me-2" />Justo magna erat amet</p>
            <p className="text-dark"><i className="fa fa-check text-primary me-2" />Aliqu diam amet diam et eos</p>
            <p className="text-dark"><i className="fa fa-check text-primary me-2" />Clita erat ipsum et lorem et sit</p>
            <div className="d-flex mt-4">
              <a className="btn btn-primary py-3 px-4 me-3" href="#donate">Donate Now</a>
              <a className="btn btn-secondary py-3 px-4" href="#about">Join Us Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}