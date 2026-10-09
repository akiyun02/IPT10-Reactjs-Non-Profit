export default function About() {
  return (
    <div id="about" className="container-fluid py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="about-img">
              <img className="img-fluid w-100" src="/img/about.jpg" alt="About" />
            </div>
          </div>
          <div className="col-lg-6">
            <p className="section-title bg-white text-start text-primary pe-3">About Us</p>
            <h1 className="display-6 mb-4">Join Hands, Change the World</h1>
            <p className="mb-4">
              Every hand extended in kindness brings us closer to a world free from suffering. Be part of a global movement dedicated to building a future where equality and compassion thrive.
            </p>
            <div className="row g-4 pt-2">
              <div className="col-sm-6">
                <div className="h-100">
                  <h3>Our Mission</h3>
                  <p>Our mission is to uplift underprivileged communities by providing resources, education, and tools for growth.</p>
                  <p className="text-dark"><i className="fa fa-check text-primary me-2" />No one should go to bed hungry.</p>
                  <p className="text-dark"><i className="fa fa-check text-primary me-2" />We spread kindness and support.</p>
                  <p className="text-dark mb-0"><i className="fa fa-check text-primary me-2" />We can change someone’s life.</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="h-100 bg-primary p-4 text-center">
                  <p className="fs-5 text-dark">Through your donations, we spread kindness and support to children and families.</p>
                  <a className="btn btn-secondary py-2 px-4" href="#donate">Donate Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}