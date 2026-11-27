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

export default function Team({ onNavigate: _onNavigate }: TeamProps) {
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

  return (
    <div id="team" className="container-fluid py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: 650 }}>
          <p className="section-title bg-white text-center text-primary px-3">Our Team</p>
          <h1 className="display-6 mb-3">Meet the People Driving Our Mission</h1>
          <p className="text-muted">
            Dedicated coordinators, developers, and community leaders working hand-in-hand to bring transparent relief and support to families in need.
          </p>
        </div>
        <div className="row g-4">
          {members.map((m) => (
            <div key={m.id} className="col-lg-4 col-md-6">
              <div className="team-item bg-white rounded shadow-sm border overflow-hidden h-100 d-flex flex-column">
                <div className="position-relative overflow-hidden" style={{ height: '280px' }}>
                  <img
                    className="img-fluid w-100 h-100"
                    src={m.image}
                    alt={m.name}
                    style={{ objectFit: 'cover' }}
                  />
                  {m.title && (
                    <span className="badge bg-secondary position-absolute top-0 start-0 m-3 px-3 py-2 fs-6">
                      {m.title}
                    </span>
                  )}
                  {m.isCurrentUser && (
                    <span className="badge bg-primary position-absolute top-0 end-0 m-3 px-3 py-2 fs-6 text-white">
                      Lead
                    </span>
                  )}
                </div>

                <div className="p-4 d-flex flex-column flex-grow-1 text-center">
                  <h4 className="fw-bold mb-1 text-dark">{m.name}</h4>
                  <p className="text-primary fw-semi-bold small text-uppercase mb-3">{m.role}</p>

                  <p className="text-muted small mb-3 flex-grow-1" style={{ lineHeight: '1.6' }}>
                    {m.bio}
                  </p>

                  {m.badges && m.badges.length > 0 && (
                    <div className="d-flex flex-wrap justify-content-center gap-1 mb-3">
                      {m.badges.map((badge, idx) => (
                        <span key={idx} className="badge bg-light text-dark border px-2 py-1 small">
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="d-flex justify-content-center gap-2 pt-3 border-top mt-auto">
                    {m.social?.github && (
                      <a
                        className="btn btn-sm btn-square btn-outline-primary"
                        href={m.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${m.name} GitHub`}
                        title="GitHub"
                      >
                        <i className="fab fa-github" />
                      </a>
                    )}
                    {m.social?.email && (
                      <a
                        className="btn btn-sm btn-square btn-outline-primary"
                        href={m.social.email}
                        aria-label={`Email ${m.name}`}
                        title="Email"
                      >
                        <i className="fa-solid fa-envelope" />
                      </a>
                    )}
                    {m.social?.facebook && (
                      <a
                        className="btn btn-sm btn-square btn-outline-primary"
                        href={m.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${m.name} Facebook`}
                        title="Facebook"
                      >
                        <i className="fab fa-facebook-f" />
                      </a>
                    )}
                    {m.social?.twitter && (
                      <a
                        className="btn btn-sm btn-square btn-outline-primary"
                        href={m.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${m.name} X / Twitter`}
                        title="X / Twitter"
                      >
                        <i className="fab fa-x-twitter" />
                      </a>
                    )}
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
