// server/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const app = express();
const port = process.env.PORT || 4242;

// Initialize Stripe with your Secret Key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Middlewares
app.use(cors({ origin: 'http://localhost:5173' })); // Allows requests from your Vite frontend
app.use(express.json());

// PaymentIntent endpoint
app.post('/api/create-payment-intent', async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, name, email } = req.body;

    // Stripe expects amounts in cents (e.g., $20.00 = 2000 cents)
    const amountInCents = Math.round(Number(amount) * 100);

    if (!amountInCents || amountInCents < 50) {
      res.status(400).json({ error: 'Donation amount must be at least $0.50.' });
      return;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true, // Enables cards, Apple Pay, Google Pay, etc.
      },
      receipt_email: email,
      metadata: {
        donor_name: name,
        donor_email: email,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error('Stripe Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Stripe server running on http://localhost:${port}`);
});