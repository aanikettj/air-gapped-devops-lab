import pool from '../src/config/database.js';

const imageUrl = 'https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2024/01/keychron-k8-mechanical-keyboard-on-desk.jpg';

try {
  const res = await pool.query(
    'UPDATE products SET image_url = $1, updated_at = CURRENT_TIMESTAMP WHERE name = $2 RETURNING *',
    [imageUrl, 'Mechanical Keyboard']
  );
  
  if (res.rows.length > 0) {
    console.log('✓ Updated Mechanical Keyboard with image');
    console.log('Product:', {
      name: res.rows[0].name,
      image_url: res.rows[0].image_url
    });
  } else {
    console.log('Product not found');
  }
  
  await pool.end();
  process.exit(0);
} catch (err) {
  console.error('Error:', err.message);
  await pool.end();
  process.exit(1);
}
