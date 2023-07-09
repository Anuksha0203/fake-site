
import {Col, Row, Toast} from 'reactstrap';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import {handleAddToCart} from '../../helpers/quantities';
import {useOutletContext} from 'react-router-dom';

function ProductInfo(props) {
  const product = props.product;

  const {products} = useOutletContext();
  const existingItems = Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [];

  function showToast(id) {
    const toastTag = document.querySelector('#' + id);
    const toast = new Toast(toastTag);
    toast.show();
  }

  return (
    <>

      <div className="p-4 rounded" style={{backgroundColor: 'rgb(235, 235, 235)'}}>

        <h5>{product.name}</h5>
        <p className="position-relative">
          {getCurrencySymbol(product.price.currency)}{(product.price.value/100).toFixed(2)}
          <span className={'badge rounded-pill ' + (product.inventory > 0 ? 'text-bg-success' : 'text-bg-danger')} style={{position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)'}}>
            {product.inventory > 0 ? product.inventory + ' In Stock' : 'Out of Stock'}
          </span></p>
        {getSpecs(product.specifications)}
        <br/>

        {
          props.btns !== false ?
          <>
            <button className="me-2 btn btn-sm btn-primary w-100" onClick={(e) => {
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
            }}>Add to Cart</button>
            {/* <button className="me-2 btn btn-sm btn-outline-secondary w-100 mt-2">Buy Now</button> */}
          </> : ''
        }

      </div>

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

function getCurrencySymbol(code) {
  if (code === 'GBP') {
    return '£';
  } else if (code === 'PKR') {
    return 'Rs ';
  } else if (code === 'CAD' || code === 'USD') {
    return '$';
  } else {
    return '€';
  }
}

function getSpecs(specs) {
  return Object.keys(specs).map((prop, key) => {
    return (
      <Row key={key}>
        <Col className="col-4">
          <small style={{fontSize: '12px'}}>{prop} </small>
        </Col>
        <Col>
          {specs[prop]}
        </Col>
      </Row>
    );
  });
}

ProductInfo.propTypes = {
  product: PropTypes.shape(
      {
        name: PropTypes.string.isRequired,
        price: PropTypes.shape(
            {
              currency: PropTypes.string.isRequired,
              value: PropTypes.number.isRequired,
            },
        ).isRequired,
        specifications: PropTypes.shape(
            {
              color: PropTypes.string.isRequired,
              size: PropTypes.string.isRequired,
            },
        ).isRequired,
        inventory: PropTypes.number.isRequired,
      },
  ).isRequired,
  btns: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,

};


export default ProductInfo;

