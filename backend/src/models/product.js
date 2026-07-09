import pool from '../config/database.js';

export const getAllProducts = async (category = null, limit = 20, offset = 0) => {
  let query = 'SELECT * FROM products';
  const params = [];

  if (category) {
    query += ' WHERE category = $1';
    params.push(category);
    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
  } else {
    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
  }

  const result = await pool.query(query, params);
  return result.rows;
};

export const getProductById = async (productId) => {
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
  return result.rows[0];
};

export const searchProducts = async (searchTerm, limit = 20, offset = 0) => {
  const result = await pool.query(
    'SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $1 LIMIT $2 OFFSET $3',
    [`%${searchTerm}%`, limit, offset]
  );
  return result.rows;
};

export const getCategories = async () => {
  const result = await pool.query('SELECT DISTINCT category FROM products WHERE category IS NOT NULL');
  return result.rows.map(row => row.category);
};

export const updateProductImageByName = async (name, imageUrl) => {
  const result = await pool.query(
    'UPDATE products SET image_url = $1, updated_at = CURRENT_TIMESTAMP WHERE name = $2 RETURNING *',
    [imageUrl, name]
  );
  return result.rows;
};
