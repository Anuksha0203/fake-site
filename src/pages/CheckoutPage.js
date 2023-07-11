import {Link} from 'react-router-dom';
import Checkout from '../components/checkouts/StripeCheckout';
import CartItems from '../components/product_tiles/CartItems';
function CheckoutPage() {
  return (
    <>
      <div className="px-4">
        <h2 className="mt-4 px-3">Checkout</h2>
        <Link to={'/cart'} className='px-3'>← Back to Cart</Link>

        <div className='row mt-4'>

          <div className='col-12 col-md-6 px-md-4'>
            <CartItems quantityAdjust={false} />
          </div>
          <div className='col-12 col-md-6 px-md-4'>
            <Checkout />
          </div>

        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
