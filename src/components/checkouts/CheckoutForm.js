import {
  AddressElement,
  PaymentElement,
} from '@stripe/react-stripe-js';
import {useState} from 'react';
import {useStripe, useElements} from '@stripe/react-stripe-js';
import {Spinner} from 'reactstrap';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/payment_success`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <h3>Billing Details</h3>
      <PaymentElement id="payment-element" />
      <h3 className='mt-4'>Shipping Details</h3>
      <AddressElement options={{
        mode: 'shipping',
        autocomplete: {
          mode: 'google_maps_api',
          apiKey: 'AIzaSyDQXIKYIv4h6mOwEFg3xk8miuiaUnv46nc',
        },
      }}/>
      <button className="btn btn-primary w-100 rounded mt-3" disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <Spinner animation="border" role="status" style={{height: '0.8rem', width: '0.8rem'}} /> : 'Pay now'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div className="text-danger" id="payment-message">{message}</div>}
    </form>
  );
}

