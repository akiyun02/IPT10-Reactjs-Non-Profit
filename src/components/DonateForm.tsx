// src/components/DonateForm.tsx
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Replace with your real Stripe Publishable Key if you have one
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51UUyHAE6lerrgAARzd3drvRRAKWWmoANLAVOI17W2SqGWBYI54k8igYCcgBCnPpND0PhTSNZz3PMMpQpiMDjDPPK00X017nbPc",
);

const AMOUNTS: number[] = [10, 20, 30, 40, 50];

export default function DonateForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<number>(20);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [initError, setInitError] = useState<string | null>(null);

  const handleProceedToPayment = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setIsInitializing(true);
    setInitError(null);

    try {
      const response = await fetch(
        "http://localhost:4242/api/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: selectedAmount,
            name,
            email,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initialize payment.");
      }

      setClientSecret(data.clientSecret);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setInitError(err.message);
      } else {
        setInitError("Failed to initialize payment gateway.");
      }
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div id="donate" className="container-fluid donate py-5">
      <div className="container">
        <div className="row g-0">
          <div className="col-lg-7 donate-text bg-light py-5">
            <div className="d-flex flex-column justify-content-center h-100 p-5">
              <h1 className="display-6 mb-4">
                Let's Donate to Needy People for Better Lives
              </h1>
              <p className="fs-5 mb-0 text-muted">
                Through your donations, we spread kindness and support to
                children, families, and communities struggling to find
                stability.
              </p>
            </div>
          </div>

          <div className="col-lg-5 donate-form bg-primary py-5 text-center">
            <div className="h-100 p-5">
              {isSuccess ? (
                <div className="bg-white p-4 rounded shadow-sm">
                  <div className="text-success mb-3">
                    <i className="fa fa-check-circle fa-3x" />
                  </div>
                  <h3 className="text-dark">Thank You!</h3>
                  <p className="text-muted">
                    Your generous donation of <strong>${selectedAmount}</strong>{" "}
                    has been successfully processed.
                  </p>
                  <button
                    type="button"
                    className="btn btn-secondary mt-3"
                    onClick={() => {
                      setIsSuccess(false);
                      setClientSecret(null);
                    }}
                  >
                    Donate Again
                  </button>
                </div>
              ) : clientSecret ? (
                <div className="bg-light p-4 rounded shadow-sm">
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: "stripe",
                        variables: {
                          colorPrimary: "#015c53",
                          borderRadius: "4px",
                        },
                      },
                    }}
                  >
                    <CheckoutForm
                      amount={selectedAmount}
                      donorName={name}
                      donorEmail={email}
                      onCancel={() => setClientSecret(null)}
                      onSuccess={() => {
                        setClientSecret(null);
                        setIsSuccess(true);
                      }}
                    />
                  </Elements>
                </div>
              ) : (
                <form onSubmit={handleProceedToPayment}>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
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
                          onChange={(e) => setEmail(e.target.value)}
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
                            className={`btn ${selectedAmount === amt ? "btn-secondary text-white" : "btn-light"}`}
                            onClick={() => setSelectedAmount(amt)}
                          >
                            ${amt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {initError && (
                      <div className="col-12">
                        <div className="alert alert-danger py-2 small mb-0 text-start">
                          {initError}
                        </div>
                      </div>
                    )}

                    <div className="col-12">
                      <button
                        className="btn btn-secondary py-3 w-100"
                        type="submit"
                        disabled={isInitializing}
                      >
                        {isInitializing
                          ? "Preparing Checkout..."
                          : "Proceed to Donate"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
