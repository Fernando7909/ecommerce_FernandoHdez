import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QSgOrLqhhGqu8RPHJgAgfjsajmkC6xfaU3AWwqk3FKzt1u0WbiwG8tA1ha1u6Z4anCQJrTmKVKZyJXRfYvmJd1H00OqihvOIV');

const Payment = ({ cartItems }) => {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        try {
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cartItems.map(item => ({
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                    })),
                    success_url: `${window.location.origin}/success`,
                    cancel_url: `${window.location.origin}/cancel`,
                }),
            });

            const { sessionId } = await response.json();

            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error('Error durant el procés de pagament:', error);
            alert('No s\'ha pogut completar el pagament.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handlePayment} disabled={loading}>
                {loading ? 'Processant...' : 'Pagar ara'}
            </button>
        </div>
    );
};

export default Payment;
