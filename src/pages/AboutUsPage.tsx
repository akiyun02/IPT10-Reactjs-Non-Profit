import About from '../components/About';
import Features from '../components/Features';
import Team from '../components/Team';

interface AboutUsPageProps {
  onNavigate?: (page: 'home' | 'about') => void;
}

export default function AboutUsPage({ onNavigate }: AboutUsPageProps) {
  return (
    <div className="about-page">
      {/* Page Header Banner */}
      <div className="container-fluid page-header py-5 mb-5">
        <div className="container text-center py-5">
          <h1 className="display-4 text-white mb-3">About Us</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <button
                  type="button"
                  className="btn btn-link p-0 text-white text-decoration-none"
                  onClick={() => onNavigate?.('home')}
                >
                  Home
                </button>
              </li>
              <li className="breadcrumb-item text-primary active" aria-current="page">
                About Us
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* About Section utilizing JSON for image */}
      <About onNavigate={onNavigate} />

      {/* Features Section */}
      <Features />

      {/* Our Team Section - One-man team with bio */}
      <Team onNavigate={onNavigate} />
    </div>
  );
}