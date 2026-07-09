import { createOrder, addOrderItems, getOrdersByUserId, getOrderById, getOrderItems } from '../models/order.js';
import { getCartByUserId, getCartItems, clearCart } from '../models/cart.js';

export const checkout = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({ message: 'Shipping address and payment method are required' });
    }

    const cart = await getCartByUserId(req.user.id);
    if (!cart) {
      return res.status(400).json({ message: 'Cart not found' });
    }

    const items = await getCartItems(cart.id);
    if (items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order = await createOrder(req.user.id, totalAmount, shippingAddress, paymentMethod);
    await addOrderItems(order.id, items);
    await clearCart(cart.id);

    res.status(201).json({ message: 'Order placed successfully', order: { id: order.id, totalAmount } });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ message: 'Checkout failed', error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await getOrdersByUserId(req.user.id);
    res.json({ orders });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrderById(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const items = await getOrderItems(id);
    res.json({ order: { ...order, items } });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
};
