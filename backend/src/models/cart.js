import pool from '../config/database.js';

export const getCartByUserId = async (userId) => {
  const result = await pool.query('SELECT id FROM carts WHERE user_id = $1', [userId]);
  return result.rows[0];
};

export const createCart = async (userId) => {
  const result = await pool.query('INSERT INTO carts (user_id) VALUES ($1) RETURNING id', [userId]);
  return result.rows[0];
};

export const getCartItems = async (cartId) => {
  const result = await pool.query(
    `SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price, p.image_url
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.cart_id = $1`,
    [cartId]
  );
  return result.rows;
};

export const addToCart = async (cartId, productId, quantity) => {
  const existingItem = await pool.query(
    'SELECT id, quantity FROM cart_items WHERE cart_id = $1 AND product_id = $2',
    [cartId, productId]
  );

  if (existingItem.rows.length > 0) {
    const newQuantity = existingItem.rows[0].quantity + quantity;
    const result = await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING id',
      [newQuantity, existingItem.rows[0].id]
    );
    return result.rows[0];
  } else {
    const result = await pool.query(
      'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING id',
      [cartId, productId, quantity]
    );
    return result.rows[0];
  }
};

export const updateCartItem = async (cartItemId, quantity) => {
  if (quantity <= 0) {
    await pool.query('DELETE FROM cart_items WHERE id = $1', [cartItemId]);
    return null;
  } else {
    const result = await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING id',
      [quantity, cartItemId]
    );
    return result.rows[0];
  }
};

export const removeFromCart = async (cartItemId) => {
  await pool.query('DELETE FROM cart_items WHERE id = $1', [cartItemId]);
};

export const clearCart = async (cartId) => {
  await pool.query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);
};
