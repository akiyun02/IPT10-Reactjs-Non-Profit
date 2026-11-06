import { useState, useEffect } from 'react';
import initialMembers from '../data/team.json';

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  title?: string;
  image: string;
  isCurrentUser?: boolean;
  bio?: string;
  badges?: string[];
  social?: {
    github?: string;
    email?: string;
    facebook?: string;
    twitter?: string;
  };
}

interface TeamProps {
  onNavigate?: (page: 'home' | 'about') => void;
}

export default function Team({ onNavigate }: TeamProps) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);

  useEffect(() => {
    fetch('/data/team.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch team.json');
        return res.json();
      })
      .then((data: TeamMember[]) => {
        setMembers(data);
      })
      .catch(() => {
        // Fallback already loaded from imported JSON
      });
  }, []);

  const handleSupportClick = (e: React.MouseEvent) => {
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
    <div id="team" className="container-fluid py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: 650 }}>
          <p className="section-title bg-white text-center text-primary px-3">One-Man Team</p>
          <h1 className="display-6 mb-3">About Me & The Mission</h1>
          <p className="text-muted">
            Charitize is powered by a dedicated solo founder and developer passionate about high-impact change.
          </p>
        </div>
        <div className="row justify-content-center">
          {members.map((m) => (
            <div key={m.id} className="col-lg-10">
              <div className="team-item bg-white p-4 p-md-5 rounded shadow-sm border">
                <div className="row g-4 align-items-center">
                  <div className="col-md-5 text-center">
                    <div className="position-relative d-inline-block w-100">
                      <img
                        className="img-fluid rounded shadow"
                        src={m.image}
                        alt={m.name}
                        style={{ width: '100%', maxHeight: '350px', objectFit: 'cover' }}
                      />
                      <span className="badge bg-secondary position-absolute top-0 start-0 m-3 px-3 py-2 fs-6">
                        {m.title || 'One-Man Team'}
                      </span>
                    </div>

                    <div className="d-flex justify-content-center gap-2 mt-4">
                      {m.social?.github && (
                        <a
                          className="btn btn-square btn-primary text-white"
                          href={m.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub Profile"
                          title="GitHub Profile"
                        >
                          <i className="fab fa-github" />
                        </a>
                      )}
                      {m.social?.email && (
                        <a
                          className="btn btn-square btn-primary text-white"
                          href={m.social.email}
                          aria-label="Send Email"
                          title="Email Me"
                        >
                          <i className="fa-solid fa-envelope" />
                        </a>
                      )}
                      {m.social?.facebook && (
                        <a
                          className="btn btn-square btn-primary text-white"
                          href={m.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Facebook Profile"
                          title="Facebook"
                        >
                          <i className="fab fa-facebook-f" />
                        </a>
                      )}
                      {m.social?.twitter && (
                        <a
                          className="btn btn-square btn-primary text-white"
                          href={m.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="X (Twitter) Profile"
                          title="Twitter / X"
                        >
                          <i className="fab fa-x-twitter" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="col-md-7 ps-md-4">
                    <span className="text-primary fw-bold text-uppercase small">One-Man Team</span>
                    <h2 className="display-6 fw-bold mb-1">{m.name}</h2>
                    <p className="text-muted fs-5 mb-3">{m.role}</p>

                    <div className="p-3 bg-light rounded mb-4 border-start border-primary border-4 text-start">
                      <h6 className="fw-bold text-dark mb-2">
                        <i className="fa-solid fa-user-tie text-primary me-2" />
                        Bio
                      </h6>
                      <p className="mb-0 text-muted" style={{ lineHeight: '1.7' }}>
                        {m.bio}
                      </p>
                    </div>

                    {m.badges && m.badges.length > 0 && (
                      <div className="d-flex flex-wrap gap-2 mb-4">
                        {m.badges.map((badge, idx) => (
                          <span key={idx} className="badge bg-light text-dark border px-3 py-2">
                            <i className="fa-solid fa-check text-primary me-1" />
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="d-flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={handleSupportClick}
                        className="btn btn-primary py-2 px-4 shadow-sm"
                      >
                        <i className="fa-solid fa-heart me-2" />
                        Support My Cause
                      </button>
                      <a
                        href={m.social?.email || 'mailto:Bacron07@gmail.com'}
                        className="btn btn-outline-secondary py-2 px-4"
                      >
                        <i className="fa-solid fa-paper-plane me-2" />
                        Contact Me
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}