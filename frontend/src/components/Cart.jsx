import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartAPI } from '../api/client.js';
import { setCart, removeItemFromCart, updateItemInCart } from '../redux/cartReducer.js';

export const Cart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector(state => state.cart);
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await cartAPI.getCart();
        dispatch(setCart(response.data.cart.items, response.data.cart.total));
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, [token, dispatch]);

  const handleRemoveItem = async (cartItemId) => {
    try {
      const response = await cartAPI.removeFromCart(cartItemId);
      dispatch(removeItemFromCart(response.data.cart.items, response.data.cart.total));
    } catch (error) {
      alert('Failed to remove item');
    }
  };

  const handleUpdateQuantity = async (cartItemId, quantity) => {
    try {
      const response = await cartAPI.updateCartItem(cartItemId, quantity);
      dispatch(updateItemInCart(response.data.cart.items, response.data.cart.total));
    } catch (error) {
      alert('Failed to update quantity');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please login to view your cart</h2>
          <a href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Login</a>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left">Product</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Quantity</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {item.image_url && (
                        <img 
                          src={item.image_url} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">${parseFloat(item.price).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 border border-gray-300 rounded px-2 py-1"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold">${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <div className="text-right mb-6">
            <p className="text-gray-600 mb-2">Subtotal: ${parseFloat(total).toFixed(2)}</p>
            <p className="text-gray-600 mb-2">Shipping: $0.00</p>
            <p className="text-2xl font-bold text-blue-600">Total: ${parseFloat(total).toFixed(2)}</p>
          </div>
          <button
            onClick={() => window.location.href = '/checkout'}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
