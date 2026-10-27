// src/components/CheckoutForm.tsx
import { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

interface CheckoutFormProps {
  amount: number;
  donorName: string;
  donorEmail: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function CheckoutForm({
  amount,
  donorName,
  donorEmail,
  onCancel,
  onSuccess,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Fallback return URL for redirect-based payment methods (iDEAL, 3DS, etc.)
        return_url: `${window.location.origin}/payment-success`,
        payment_method_data: {
          billing_details: {
            name: donorName,
            email: donorEmail,
          },
        },
      },
      redirect: 'if_required', // Avoid redirecting away if not strictly needed
    });

    if (error) {
      setErrorMessage(error.message ?? 'An unexpected payment error occurred.');
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setIsLoading(false);
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-start mt-3">
      <div className="mb-3">
        <h5 className="text-dark">Donating: ${amount}.00</h5>
        <p className="text-muted small">
          Supporting donor: {donorName} ({donorEmail})
        </p>
      </div>

      {/* Stripe Payment Element (Cards, Wallets, etc.) */}
      <div className="p-3 bg-white rounded border mb-3">
        <PaymentElement />
      </div>

      {errorMessage && (
        <div className="alert alert-danger py-2 small" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="d-flex gap-2">
        <button
          type="button"
          className="btn btn-outline-secondary w-50"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || isLoading}
          className="btn btn-secondary w-50 py-2 d-flex align-items-center justify-content-center"
        >
          {isLoading ? (
            <span className="spinner-border spinner-border-sm me-2" role="status" />
          ) : null}
          {isLoading ? 'Processing...' : `Pay $${amount}`}
        </button>
      </div>
    </form>
  );
}