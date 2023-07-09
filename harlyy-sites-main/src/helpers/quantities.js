import {Toast} from 'bootstrap';
import Cookies from 'js-cookie';

export const getCartQuantity = () => {
  const existingItems = Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [];
  let q = 0;
  existingItems.forEach((item) => {
    q += item.quantity;
  });
  return q;
};


function showToast(id) {
  const toastTag = document.querySelector('#' + id);
  const toast = new Toast(toastTag);
  toast.show();
}

export const handleAddToCart = (id, products, quantity) => {
  // Get the existing cart items from the cookie
  const existingItems = Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [];

  if (existingItems.length > 0) {
    // Check if the item already exists in the cart
    const itemIndex = existingItems.findIndex((item) => item.id === id);
    if (itemIndex > -1 && parseInt(products[id].inventory) >= parseInt(quantity)) {
      // Item exists in the cart, update the quantity
      existingItems[itemIndex].quantity = quantity;
      Cookies.set('cartItems', JSON.stringify(existingItems));

      const badge = document.querySelector('#cart-quantity');
      if (getCartQuantity() === 0) {
        badge.classList.add('d-none');
      } else {
        badge.classList.remove('d-none');
        badge.textContent = getCartQuantity();
      }
      const toastCartNum = document.querySelector('#addedToCartToast span');
      toastCartNum.textContent = getCartQuantity();
      showToast('addedToCartToast');
      return;
    } else if (itemIndex > -1) {
      showToast('maxQuantityToast');
      return;
    }
  }
  // Create a new item to add to the cart
  const newItem = {
    id: id,
    quantity: quantity || 1,
    // Include any other properties you need for the item
  };

  // Add the new item to the existing items array
  const updatedItems = [...existingItems, newItem];

  // Set the updated cart items in the cookie
  Cookies.set('cartItems', JSON.stringify(updatedItems));
  const badge = document.querySelector('#cart-quantity');
  if (getCartQuantity() === 0) {
    badge.classList.add('d-none');
  } else {
    badge.classList.remove('d-none');
    badge.textContent = getCartQuantity();
  }
  const toastCartNum = document.querySelector('#addedToCartToast span');
  toastCartNum.textContent = getCartQuantity();
  showToast('addedToCartToast');
};
