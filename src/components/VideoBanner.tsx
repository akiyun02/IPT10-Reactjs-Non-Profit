import { useState, useEffect } from 'react';

export default function VideoBanner() {
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const videoSrc = "https://www.youtube.com/embed/DWRcNpR6Kdc";

  useEffect(() => {
    if (!isVideoOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVideoOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isVideoOpen]);

  return (
    <>
      <div className="container-fluid bg-primary mb-5">
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-11">
              <div className="h-100 py-5 d-flex align-items-center">
                <button 
                  type="button" 
                  className="btn-play"
                  onClick={() => setIsVideoOpen(true)}
                  aria-label="Play Video"
                >
                  <span />
                </button>
                <h3 className="ms-5 mb-0">Together, we can build a world where everyone has the chance to thrive.</h3>
              </div>
            </div>
            <div className="d-none d-lg-block col-lg-1">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('about');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn h-100 w-100 bg-secondary d-flex align-items-center justify-content-center p-0 border-0 rounded-0"
                style={{ cursor: 'pointer' }}
                aria-label="Scroll down to About section"
              >
                <span className="text-white" style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>
                  Scroll Down
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isVideoOpen && (
        <div 
          className="modal fade show d-block" 
          tabIndex={-1} 
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          role="dialog"
          onClick={() => setIsVideoOpen(false)}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title">YouTube Video</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setIsVideoOpen(false)}
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="ratio ratio-16x9">
                  <iframe 
                    className="embed-responsive-item" 
                    src={`${videoSrc}?autoplay=1`} 
                    title="YouTube video"
                    allow="autoplay"
                    allowFullScreen 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}