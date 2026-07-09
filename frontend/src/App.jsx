import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store.js';
import { Register, Login } from './components/Auth.jsx';
import ProductList from './components/ProductList.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import { Header, Orders } from './components/Header.jsx';
import { setUser, setToken } from './redux/authReducer.js';
import { authAPI } from './api/client.js';
import './styles/index.css';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setToken(token));
      // Optionally fetch user profile
    }
  }, []);

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
