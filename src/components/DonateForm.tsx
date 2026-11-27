// src/components/DonateForm.tsx
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { CMS_API_BASE } from "../config/api";

// Replace with your real Stripe Publishable Key if you have one
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51UUyHAE6lerrgAARzd3drvRRAKWWmoANLAVOI17W2SqGWBYI54k8igYCcgBCnPpND0PhTSNZz3PMMpQpiMDjDPPK00X017nbPc",
);

const PRESET_AMOUNTS: number[] = [10, 20, 50, 100];

interface DonateFormProps {
  selectedCause?: string;
  onClearCause?: () => void;
  onDonationRecorded?: () => void;
}

export default function DonateForm({ selectedCause, onClearCause, onDonationRecorded }: DonateFormProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<number>(20);
  const [isCustomAmount, setIsCustomAmount] = useState<boolean>(false);
  const [customAmountStr, setCustomAmountStr] = useState<string>("");

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("status") === "success") {
      setIsSuccess(true);
      const cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, "", cleanUrl);
      setTimeout(() => {
        document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, []);

  const parsedCustom = Number(customAmountStr);
  const isCustomInvalid = isCustomAmount && (!customAmountStr.trim() || isNaN(parsedCustom) || parsedCustom < 1);
  const activeAmount = isCustomAmount
    ? (isNaN(parsedCustom) || parsedCustom < 1 ? 0 : Math.round(parsedCustom))
    : selectedAmount;

  const handleProceedToPayment = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (activeAmount < 1) {
      setInitError("Please enter a donation amount of at least $1.");
      return;
    }

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
            amount: activeAmount,
            name,
            email,
            cause: selectedCause || "General Community Support",
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
        if (
          err.message.includes("Failed to fetch") ||
          err.message.includes("NetworkError") ||
          err.message.includes("Load failed")
        ) {
          setInitError(
            "Could not reach backend server at http://localhost:4242. Please ensure start.bat (or 'npm start' in the server folder) is running.",
          );
        } else {
          setInitError(err.message);
        }
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
        <div className="row g-0 rounded shadow overflow-hidden">
          <div className="col-lg-7 donate-text bg-light py-5">
            <div className="d-flex flex-column justify-content-center h-100 p-4 p-md-5">
              <span className="text-primary fw-bold text-uppercase mb-2">Direct Community Aid</span>
              <h1 className="display-6 mb-4">
                Empower Communities with Transparent Giving
              </h1>
              <p className="fs-5 mb-4 text-muted" style={{ lineHeight: "1.7" }}>
                Every contribution goes straight to purchasing fresh food staples, water filtration kits, and school supplies for children in need. Zero administrative bloat, 100% accountable impact.
              </p>
              <div className="row g-3">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center">
                    <i className="fa-solid fa-lock text-primary fs-4 me-3" />
                    <div>
                      <h6 className="mb-0 fw-bold">Secure Stripe Gateway</h6>
                      <small className="text-muted">Encrypted card &amp; digital payments</small>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center">
                    <i className="fa-solid fa-receipt text-primary fs-4 me-3" />
                    <div>
                      <h6 className="mb-0 fw-bold">Instant Email Receipt</h6>
                      <small className="text-muted">Detailed transaction verification</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5 donate-form bg-primary py-5 text-center">
            <div className="h-100 p-4 p-md-5">
              {isSuccess ? (
                <div className="bg-white p-4 rounded shadow-sm text-center">
                  <div className="text-success mb-3">
                    <i className="fa fa-check-circle fa-3x" />
                  </div>
                  <h3 className="text-dark fw-bold">Thank You, {name}!</h3>
                  <p className="text-muted mt-2">
                    Your generous donation of <strong>${activeAmount}.00</strong>{" "}
                    {selectedCause && (
                      <>
                        towards <strong>{selectedCause}</strong>{" "}
                      </>
                    )}
                    has been successfully received. We will send a confirmation receipt to <strong>{email}</strong>.
                  </p>
                  <button
                    type="button"
                    className="btn btn-secondary mt-3 px-4 py-2"
                    onClick={() => {
                      setIsSuccess(false);
                      setClientSecret(null);
                      if (onClearCause) onClearCause();
                    }}
                  >
                    Donate Again
                  </button>
                </div>
              ) : clientSecret ? (
                <div className="bg-light p-4 rounded shadow-sm text-start">
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
                      amount={activeAmount}
                      donorName={name}
                      donorEmail={email}
                      onCancel={() => setClientSecret(null)}
                      onSuccess={() => {
                        fetch(`${CMS_API_BASE}/donations`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            cause_title: selectedCause || null,
                            donor_name: name,
                            donor_email: email,
                            amount: activeAmount,
                            status: "succeeded",
                          }),
                        })
                          .then(() => onDonationRecorded?.())
                          .catch(() => {
                            // Non-blocking if CMS API is offline
                          });
                        setClientSecret(null);
                        setIsSuccess(true);
                      }}
                    />
                  </Elements>
                </div>
              ) : (
                <form onSubmit={handleProceedToPayment}>
                  <div className="row g-3">
                    <div className="col-12 text-start">
                      <h4 className="text-white fw-bold mb-1">Make a Donation</h4>
                      <p className="text-white-50 small mb-0">Join in supporting urgent community programs.</p>
                    </div>

                    {selectedCause && (
                      <div className="col-12">
                        <div className="p-2 px-3 bg-white bg-opacity-25 rounded border border-white text-white d-flex align-items-center justify-content-between small text-start">
                          <span>
                            <i className="fa-solid fa-heart me-2 text-warning" />
                            Target Cause: <strong>{selectedCause}</strong>
                          </span>
                          {onClearCause && (
                            <button
                              type="button"
                              className="btn btn-sm btn-link text-white p-0 border-0"
                              onClick={onClearCause}
                              aria-label="Remove cause selection"
                              title="Clear cause selection"
                            >
                              <i className="fa-solid fa-xmark fs-6" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Your Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        <label htmlFor="name">Your Full Name</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <label htmlFor="email">Email Address for Receipt</label>
                      </div>
                    </div>

                    {/* Amount Selector */}
                    <div className="col-12">
                      <label className="text-white small fw-bold d-block text-start mb-2">
                        Select Donation Amount
                      </label>
                      <div className="btn-group w-100" role="group">
                        {PRESET_AMOUNTS.map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            className={`btn ${
                              !isCustomAmount && selectedAmount === amt
                                ? "btn-secondary text-white fw-bold"
                                : "btn-light"
                            }`}
                            onClick={() => {
                              setIsCustomAmount(false);
                              setSelectedAmount(amt);
                            }}
                          >
                            ${amt}
                          </button>
                        ))}
                        <button
                          type="button"
                          className={`btn ${
                            isCustomAmount
                              ? "btn-secondary text-white fw-bold"
                              : "btn-light"
                          }`}
                          onClick={() => setIsCustomAmount(true)}
                        >
                          Custom
                        </button>
                      </div>
                    </div>

                    {isCustomAmount && (
                      <div className="col-12">
                        <div className="input-group">
                          <span className="input-group-text bg-light fw-bold">$</span>
                          <input
                            type="number"
                            min="1"
                            step="1"
                            className="form-control"
                            placeholder="Enter amount (min $1 USD)"
                            value={customAmountStr}
                            onChange={(e) => setCustomAmountStr(e.target.value)}
                            required
                            autoFocus
                          />
                        </div>
                      </div>
                    )}

                    {initError && (
                      <div className="col-12">
                        <div className="alert alert-danger py-2 small mb-0 text-start">
                          <i className="fa-solid fa-circle-exclamation me-2" />
                          {initError}
                        </div>
                      </div>
                    )}

                    <div className="col-12">
                      <button
                        className="btn btn-secondary py-3 w-100 fw-bold shadow-sm"
                        type="submit"
                        disabled={isInitializing || isCustomInvalid}
                      >
                        {isInitializing ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" />
                            Connecting Gateway...
                          </>
                        ) : isCustomInvalid ? (
                          "Enter a valid amount ($1 min)"
                        ) : (
                          `Proceed to Pay $${activeAmount}`
                        )}
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
