import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { orderAPI } from '../api/client.js';
import { logout } from '../redux/authReducer.js';

export const Header = () => {
  const { user, token } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-blue-600">EComm</a>
        
        <div className="flex items-center gap-8">
          <a href="/" className="hover:text-blue-600">Products</a>
          {token && <a href="/orders" className="hover:text-blue-600">Orders</a>}
          <a href="/cart" className="hover:text-blue-600 relative">
            Cart
            {items.length > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{items.length}</span>}
          </a>
          
          {token ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">{user?.name}</span>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Logout</button>
            </div>
          ) : (
            <div className="flex gap-4">
              <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</a>
              <a href="/register" className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">Register</a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getOrders();
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSelectOrder = async (orderId) => {
    try {
      const response = await orderAPI.getOrder(orderId);
      setSelectedOrder(response.data.order);
    } catch (error) {
      alert('Failed to fetch order details');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please login to view orders</h2>
          <a href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="md:col-span-2">
            {orders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <p className="text-gray-600 mb-4">No orders yet</p>
                <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg inline-block">Start Shopping</a>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => handleSelectOrder(order.id)}
                    className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-600">Order ID: {order.id.substring(0, 8)}...</p>
                        <p className="text-lg font-bold">${order.total_amount}</p>
                        <p className="text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded text-sm font-medium ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Details */}
          {selectedOrder && (
            <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
              <h2 className="text-xl font-bold mb-4">Order Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-mono text-sm">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-bold">{selectedOrder.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-lg font-bold text-blue-600">${parseFloat(selectedOrder.total_amount).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Items</p>
                  <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                    {selectedOrder.items?.map((item) => (
                      <div key={item.id} className="flex gap-2 items-start">
                        {item.image_url && (
                          <img 
                            src={item.image_url}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-gray-600">x{item.quantity} @ ${parseFloat(item.price_at_purchase).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default { Header, Orders };
