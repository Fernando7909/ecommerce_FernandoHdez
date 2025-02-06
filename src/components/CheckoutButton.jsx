import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
 
const stripePromise = loadStripe('pk_test_xxxxx'); // Clau pública de Stripe
 
const CheckoutButton = ({ items }) => {
  const handleClick = async () => {
    const stripe = await stripePromise;
 
    const response = await fetch(
      'https://us-central1-TU_PROJECTE.cloudfunctions.net/createCheckoutSession',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      }
    );
 
    const { sessionId } = await response.json();
 
    // Redirigeix a Stripe Checkout
    await stripe.redirectToCheckout({ sessionId });
  };
 
  return (
    <button onClick={handleClick}>
      Pagar amb Stripe
    </button>
  );
};
 
export default CheckoutButton;
 
