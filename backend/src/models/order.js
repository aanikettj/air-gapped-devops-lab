import pool from '../config/database.js';

export const createOrder = async (userId, totalAmount, shippingAddress, paymentMethod) => {
  const result = await pool.query(
    'INSERT INTO orders (user_id, total_amount, shipping_address, payment_method, status) VALUES ($1, $2, $3, $4, $5) RETURNING id',
    [userId, totalAmount, shippingAddress, paymentMethod, 'pending']
  );
  return result.rows[0];
};

export const addOrderItems = async (orderId, items) => {
  for (const item of items) {
    await pool.query(
      'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4)',
      [orderId, item.product_id, item.quantity, item.price]
    );
  }
};

export const getOrdersByUserId = async (userId) => {
  const result = await pool.query(
    'SELECT id, total_amount, status, created_at FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
};

export const getOrderById = async (orderId) => {
  const result = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);
  return result.rows[0];
};

export const getOrderItems = async (orderId) => {
  const result = await pool.query(
    `SELECT oi.id, oi.product_id, oi.quantity, oi.price_at_purchase, p.name, p.image_url
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = $1`,
    [orderId]
  );
  return result.rows;
};

export const updateOrderStatus = async (orderId, status) => {
  const result = await pool.query(
    'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id',
    [status, orderId]
  );
  return result.rows[0];
};
