interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

const MEMBERS: TeamMember[] = [
  { id: 1, name: 'Boris Johnson', role: 'Founder & CEO', image: '/img/team-1.jpg' },
  { id: 2, name: 'Donald Pakura', role: 'Project Manager', image: '/img/team-2.jpg' },
  { id: 3, name: 'Alexander Bell', role: 'Volunteer', image: '/img/team-3.jpg' },
];

export default function Team() {
  return (
    <div id="team" className="container-fluid py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: 500 }}>
          <p className="section-title bg-white text-center text-primary px-3">Our Team</p>
          <h1 className="display-6 mb-4">Meet Our Dedicated Team Members</h1>
        </div>
        <div className="row g-4">
          {MEMBERS.map((m) => (
            <div key={m.id} className="col-md-6 col-lg-4">
              <div className="team-item d-flex h-100 p-4">
                <div className="team-detail pe-4">
                  <img className="img-fluid mb-4" src={m.image} alt={m.name} />
                  <h3>{m.name}</h3>
                  <span>{m.role}</span>
                </div>
                <div className="team-social bg-light d-flex flex-column justify-content-center flex-shrink-0 p-4">
                  <a className="btn btn-square btn-primary my-2" href="#"><i className="fab fa-facebook-f" /></a>
                  <a className="btn btn-square btn-primary my-2" href="#"><i className="fab fa-x-twitter" /></a>
                  <a className="btn btn-square btn-primary my-2" href="#"><i className="fab fa-instagram" /></a>
                  <a className="btn btn-square btn-primary my-2" href="#"><i className="fab fa-youtube" /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}