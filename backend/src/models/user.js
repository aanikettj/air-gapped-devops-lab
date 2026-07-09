import pool from '../config/database.js';

export const getUserById = async (userId) => {
  const result = await pool.query('SELECT id, name, email, phone, address, city, state, zip_code FROM users WHERE id = $1', [userId]);
  return result.rows[0];
};

export const getUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

export const createUser = async (name, email, passwordHash) => {
  const result = await pool.query(
    'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name, email, passwordHash]
  );
  return result.rows[0];
};

export const updateUser = async (userId, userData) => {
  const { name, phone, address, city, state, zip_code } = userData;
  const result = await pool.query(
    'UPDATE users SET name = COALESCE($1, name), phone = COALESCE($2, phone), address = COALESCE($3, address), city = COALESCE($4, city), state = COALESCE($5, state), zip_code = COALESCE($6, zip_code) WHERE id = $7 RETURNING id, name, email, phone, address, city, state, zip_code',
    [name, phone, address, city, state, zip_code, userId]
  );
  return result.rows[0];
};
