import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';
import {useOutletContext} from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import {getCartQuantity, handleAddToCart} from '../../helpers/quantities';
import {useState} from 'react';

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
function CartItems(props) {
  const [reloads, setReloads] = useState(0);
  const {products} = useOutletContext();
  if (Object.keys(products).length === 0) {
    return (null);
  }

  // get cartitems from cookie
  const cartItems = Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [];

  function getCartValue() {
    let total = 0;
    cartItems.forEach((item) => {
      total += products[item.id].price.value * item.quantity;
    });
    return total;
  }

  let cartContent;
  // for all the products stored in the cookies with the matching ID, list them here
  if (getCartQuantity() > 0) {
    cartContent =
      <>
        <Card>
          <CardBody className='pb-2'>
            {
              cartItems.map((item, key) => {
                if (item.quantity === 0 || !item.id) {
                  return (<></>);
                }

                return (
                  <Row className='mb-2 align-items-center' key={key}>
                    <Col md='2'>
                      <img width='100%' src={products[item.id].images ? products[item.id].images[0] : ''}/>
                    </Col>
                    <Col md='6'>
                      {products[item.id].name}
                    </Col>
                    <Col md='2'>
                      {getCurrencySymbol(products[item.id].price.currency)}{(products[item.id].price.value/100).toFixed(2)}
                    </Col>
                    <Col md='2'>
                      {
                        props.quantityAdjust ?
                        <select className='form-select p-2' value={item.quantity} onChange={(e) => {
                          handleAddToCart(item.id, products, parseInt(e.target.value)); setReloads(reloads + 1);
                        }}>
                          {Array.from({length: products[item.id].inventory + 1}, (_, index) => index).map((i) => {
                            return (
                              <option key={i} value={i}>
                                {i}
                              </option>
                            );
                          })}
                        </select> :
                        <>
                          <span className='d-inline d-md-none'>Quantity: </span>
                          {item.quantity}
                        </>
                      }
                    </Col>
                  </Row>
                );
              })
            }
          </CardBody>
        </Card>
        <Card className='mt-3'>
          <CardBody>
            Total: {getCurrencySymbol(products[cartItems[0].id].price.currency)}{(getCartValue()/100).toFixed(2)}
          </CardBody>
        </Card>
      </>;
  } else {
    cartContent = (
      <Card>
        <CardBody>
          <CardTitle tag="h5" className='mb-0'>No items in cart</CardTitle>
        </CardBody>
      </Card>
    );
  }

  return (
    <>
      {cartContent}

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

CartItems.propTypes = {
  quantityAdjust: PropTypes.string.isRequired,
};

export default CartItems;
