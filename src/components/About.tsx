import { useState, useEffect } from 'react';
import aboutDataJson from '../data/about.json';

interface AboutData {
  image: string;
  alt?: string;
  title?: string;
  heading?: string;
  description?: string;
  soloFounder?: {
    name: string;
    role: string;
    bio: string;
  };
  mission?: {
    title: string;
    description: string;
    points: string[];
  };
  donationCallout?: {
    text: string;
    buttonText: string;
    buttonLink: string;
  };
}

interface AboutProps {
  onNavigate?: (page: 'home' | 'about') => void;
}

export default function About({ onNavigate }: AboutProps) {
  const [aboutData, setAboutData] = useState<AboutData>(aboutDataJson);

  useEffect(() => {
    fetch('/data/about.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch about.json');
        return res.json();
      })
      .then((data: AboutData) => {
        setAboutData(data);
      })
      .catch(() => {
        // Fallback already initialized from imported JSON
      });
  }, []);

  const handleDonateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('home');
    }
    setTimeout(() => {
      const el = document.getElementById('donate');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div id="about" className="container-fluid py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="about-img position-relative">
              <img
                className="img-fluid w-100 rounded shadow"
                src={aboutData.image}
                alt={aboutData.alt || 'About'}
              />
              <span className="badge bg-primary position-absolute bottom-0 start-0 m-3 px-3 py-2 fs-6 text-white">
                One-Man Team Initiative
              </span>
            </div>
          </div>
          <div className="col-lg-6">
            <p className="section-title bg-white text-start text-primary pe-3">{aboutData.title || 'About Us'}</p>
            <h1 className="display-6 mb-4">{aboutData.heading || 'Join Hands, Change the World'}</h1>
            <p className="mb-4">
              {aboutData.description ||
                'Every hand extended in kindness brings us closer to a world free from suffering. Be part of a global movement dedicated to building a future where equality and compassion thrive.'}
            </p>

            {aboutData.soloFounder && (
              <div className="p-3 bg-light rounded mb-4 border-start border-primary border-4 text-start">
                <h6 className="fw-bold text-dark mb-1">
                  <i className="fa-solid fa-user-astronaut text-primary me-2" />
                  {aboutData.soloFounder.name} &mdash; <span className="text-muted fw-normal">{aboutData.soloFounder.role}</span>
                </h6>
                <p className="small text-muted mb-0">{aboutData.soloFounder.bio}</p>
              </div>
            )}

            <div className="row g-4 pt-2">
              <div className="col-sm-6">
                <div className="h-100">
                  <h3>{aboutData.mission?.title || 'Our Mission'}</h3>
                  <p>
                    {aboutData.mission?.description ||
                      'Our mission is to uplift underprivileged communities by providing resources, education, and tools for growth.'}
                  </p>
                  {(aboutData.mission?.points || [
                    'No one should go to bed hungry.',
                    'We spread kindness and support.',
                    'We can change someone’s life.',
                  ]).map((point, index, arr) => (
                    <p key={index} className={`text-dark ${index === arr.length - 1 ? 'mb-0' : ''}`}>
                      <i className="fa fa-check text-primary me-2" />
                      {point}
                    </p>
                  ))}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="h-100 bg-primary p-4 text-center rounded d-flex flex-column justify-content-center">
                  <p className="fs-5 text-dark mb-4">
                    {aboutData.donationCallout?.text ||
                      'Through your donations, we spread kindness and support to children and families.'}
                  </p>
                  <button
                    type="button"
                    onClick={handleDonateClick}
                    className="btn btn-secondary py-2 px-4 shadow-sm"
                  >
                    {aboutData.donationCallout?.buttonText || 'Donate Now'}
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