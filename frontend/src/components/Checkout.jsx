import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { orderAPI, cartAPI } from '../api/client.js';
import { clearCartAction } from '../redux/cartReducer.js';

export const Checkout = () => {
  const [formData, setFormData] = useState({
    shippingAddress: '',
    paymentMethod: 'credit_card',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { items, total } = useSelector(state => state.cart);
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await orderAPI.checkout(formData.shippingAddress, formData.paymentMethod);
      dispatch(clearCartAction());
      alert('Order placed successfully!');
      window.location.href = `/order/${response.data.order.id}`;
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please login to checkout</h2>
          <a href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Login</a>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Cart is empty</h2>
          <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <textarea
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded h-24"
                    placeholder="Enter your shipping address"
                  />
                </div>

                <h2 className="text-2xl font-bold mb-4 mt-8">Payment Method</h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Select Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                  >
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-4 max-h-96 overflow-y-auto border-b pb-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-start">
                  {item.image_url && (
                    <img 
                      src={item.image_url}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-600">x{item.quantity}</p>
                  </div>
                  <span className="font-medium text-sm">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${parseFloat(total).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-blue-600">
                <span>Total:</span>
                <span>${parseFloat(total).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
