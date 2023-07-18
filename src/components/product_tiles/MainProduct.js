import {useNavigate, useOutletContext} from 'react-router-dom';
import {Button, Card, CardBody, CardImg} from 'reactstrap';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import {Toast} from 'bootstrap';
import {handleAddToCart} from '../../helpers/quantities';

function MainProduct(props) {
  const navigate = useNavigate();

  const {products} = useOutletContext();
  const existingItems = Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [];

  function getCurrencySymbol(code) {
    if (code === 'GBP') {
      return '£';
    } else if (code === 'PKR') {
      return 'Rs ';
    } else if (code === 'EUR') {
      return '€';
    } else {
      return '$';
    }
  }

  function showToast(id) {
    const toastTag = document.querySelector('#' + id);
    const toast = new Toast(toastTag);
    toast.show();
  }
  return (
    <>
      <Card className={'text-center ' + props.className} style={{maxWidth: '300px', display: 'inline-block'}}>
        <CardImg src={props.product.images[0]}
          style={{borderBottomLeftRadius: '0', borderBottomRightRadius: '0', height: '210px'}}
        />
        {
          props.product.inventory > 0 ?
          <div className="text-white px-2 bg-success">In Stock</div> :
          <div className="text-white px-2" style={{backgroundColor: 'rgb(250, 70, 70)'}}>Out of Stock</div>
        }
        <CardBody>
          <p className="mb-1" style={{height: '80px'}}>{props.product.name}</p>
          <small>{getCurrencySymbol(props.product.price.currency)}{(props.product.price.value/100).toFixed(2)}</small><br/><br/>

          <Button href={'shop/' + props.id} className="btn-primary" onClick={(e) => {
            e.preventDefault(); navigate(props.id);
          }}>View</Button>
          <Button color='secondary' style={{}} onClick={(e) => {
            e.preventDefault();
            if (props.product.inventory > 0) {
              const itemIndex = existingItems.findIndex((item) => item.id === props.id);
              if (itemIndex > -1) {
                existingItems[itemIndex].quantity++;
              } else {
                existingItems.push({
                  id: props.id,
                  quantity: 1,
                });
              }
              handleAddToCart(props.id, products, itemIndex > -1 ? existingItems[itemIndex].quantity : 1);
            } else {
              showToast('outOfStockToast');
            }
          }} >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20">
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
            </svg>

          </Button>
        </CardBody>
      </Card>

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="addedToCartToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Item added to cart</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
            <span>0</span> items in cart
          </div>
        </div>
      </div>

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="outOfStockToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Product is currently out of stock</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="maxQuantityToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Maximum quantity reached</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>
    </>
  );
}

MainProduct.propTypes = {
  product: PropTypes.object,
  id: PropTypes.string,
  className: PropTypes.string,
};

export default MainProduct;

