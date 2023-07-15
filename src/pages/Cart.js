
import CartItems from '../components/product_tiles/CartItems';
import {Link} from 'react-router-dom';
import {getCartQuantity} from '../helpers/quantities';

function Cart() {
  return (
    <>
      <div className='row mt-4 px-3 px-md-0'>

        <div className='col-12 offset-md-3 col-md-6 px-md-4'>
          <h2 className='mb-4'>Your Cart</h2>
          <CartItems quantityAdjust={true} />
          <Link to={'/checkout'} className={'btn btn-primary disabled w-100 mt-3 rounded' + (getCartQuantity() === 0 ? ' disabled' : '')}>Go to Checkout</Link>
        </div>

      </div>
    </>
  );
}

export default Cart;
