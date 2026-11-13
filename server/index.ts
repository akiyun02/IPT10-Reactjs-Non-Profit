// server/index.ts
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const app = express();
const port = process.env.PORT || 4242;

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('⚠️ WARNING: STRIPE_SECRET_KEY is not defined in server/.env');
}

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

// Allow all local development origins (5173, 5174, 4173, etc.)
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      if (
        origin.startsWith('http://localhost:') ||
        origin.startsWith('http://127.0.0.1:') ||
        origin.endsWith('.local')
      ) {
        return callback(null, true);
      }
      callback(null, true); // Permissive in development
    },
    credentials: true,
  })
);

app.use(express.json());

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response): void => {
  res.json({ status: 'ok', service: 'Charitize Stripe Backend', port });
});

// PaymentIntent endpoint
app.post('/api/create-payment-intent', async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, name, email, cause } = req.body;

    // Stripe expects amounts in cents (e.g., $20.00 = 2000 cents)
    const amountInCents = Math.round(Number(amount) * 100);

    if (!amountInCents || amountInCents < 50) {
      res.status(400).json({ error: 'Donation amount must be at least $0.50 USD.' });
      return;
    }

    const metadata: Record<string, string> = {
      donor_name: String(name || 'Anonymous'),
      donor_email: String(email || ''),
      cause: String(cause || 'General Community Support'),
    };

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true, // Enables card, Apple Pay, Google Pay, etc.
      },
      receipt_email: email || undefined,
      metadata,
    });

    console.log(`[Stripe] Created PaymentIntent for $${amount} (${metadata.cause}) by ${metadata.donor_name}`);
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    const err = error as Error;
    console.error('Stripe Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Charitize backend running on http://localhost:${port}`);
});
