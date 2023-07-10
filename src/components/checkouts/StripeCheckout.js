
import {Spinner} from 'reactstrap';
import client from '../../project/client-settings.json';

// Stripe and Checkout
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

// Firebase stuff
import {httpsCallable} from 'firebase/functions';
import {useEffect, useState} from 'react';
import {useOutletContext} from 'react-router-dom';
import Cookies from 'js-cookie';
import {functions} from '../../project/Firebase';

function StripeCheckout() {
  const {business} = useOutletContext();

  const stripePromise = loadStripe('pk_test_51MZKzACvtecwVgTq4qiGroJqA68TJUPrgtJMTZcpGbU8EnqO92suPl4YHlFCCylIylisPCbOATCGQrrIFCxjh5Rm0033aWVtbb', {
    stripeAccount: business.stripeAcc,
  });

  const [clientSecret, setClientSecret] = useState(null);
  useEffect(() => {
    const data = {
      businessId: client.businessId,
      items: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [],
      stripeAcc: business.stripeAcc,
    };

    const createEcommerceCheckout = httpsCallable(functions, 'createEcommerceCheckout');
    createEcommerceCheckout(data).then((data) => {
      setClientSecret(data.data.client_secret);
    });
  }, [business.stripeAcc]);

  return (
    <div className='mt-4 mt-md-0'>
      {clientSecret && stripePromise ? (
      <Elements stripe={stripePromise} options={{clientSecret}}>
        <CheckoutForm />
      </Elements>
      ) :

      <Spinner animation="border" role="status" style={{height: '50px', width: '50px', position: 'relative', left: 'calc(50% - 25px)'}} />}
    </div>
  );
}

export default StripeCheckout;
