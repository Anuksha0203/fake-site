import CartItems from '../components/product_tiles/CartItems';

function PaymentSuccess() {
  return (
    <>
      <div className="px-4">
        <h2 className="mt-4 px-3">Thank You For Your Purchase</h2>

        <div className='row mt-4'>

          <div className='col-12 col-md-6 px-md-4'>
            <CartItems/>
          </div>
          <div className='col-12 col-md-6 px-md-4'>

          </div>

        </div>
      </div>
    </>
  );
}

export default PaymentSuccess;
