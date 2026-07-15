import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store.js';
import { Register, Login } from './components/Auth.jsx';
import ProductList from './components/ProductList.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import { Header, Orders } from './components/Header.jsx';
import { setToken } from './redux/authReducer.js';
import './styles/index.css';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    dispatch(setToken(token));
  }
}, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
