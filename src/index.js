import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import 'bootstrap/dist/js/bootstrap.min.js';
import './assets/css/bootstrap.min.css';

import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Cart from './pages/Cart';
import Product from './pages/Product';
import PaymentSuccess from './pages/PaymentSuccess';
import CheckoutPage from './pages/CheckoutPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />

            <Route exact path="shop" element={<Shop />} />
            <Route path="shop/*" element={<Product />} />

            <Route path="about" element={<About />} />

            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="payment_success" element={<PaymentSuccess />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
