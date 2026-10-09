import { useState } from 'react';

const AMOUNTS: number[] = [10, 20, 30, 40, 50];

export default function DonateForm() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<number>(10);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting Donation:', { name, email, amount: selectedAmount });
  };

  return (
    <div id="donate" className="container-fluid donate py-5">
      <div className="container">
        <div className="row g-0">
          <div className="col-lg-7 donate-text bg-light py-5">
            <div className="d-flex flex-column justify-content-center h-100 p-5">
              <h1 className="display-6 mb-4">Let's Donate to Needy People for Better Lives</h1>
              <p className="fs-5 mb-0">
                Through your donations, we spread kindness and support to children, families, and communities struggling to find stability.
              </p>
            </div>
          </div>
          <div className="col-lg-5 donate-form bg-primary py-5 text-center">
            <div className="h-100 p-5">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="form-floating">
                      <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder="Your Name"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        required
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder="Your Email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        required
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="btn-group w-100" role="group">
                      {AMOUNTS.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          className={`btn ${selectedAmount === amt ? 'btn-secondary' : 'btn-light'}`}
                          onClick={() => setSelectedAmount(amt)}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-secondary py-3 w-100" type="submit">
                      Donate Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}