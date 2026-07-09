import pool from '../src/config/database.js';

try {
  const res = await pool.query("SELECT name, COUNT(*) AS cnt FROM products GROUP BY name HAVING COUNT(*) > 1 ORDER BY name;");
  if (res.rows.length === 0) {
    console.log('No duplicate product names found.');
  } else {
    console.log('Duplicate product names:');
    console.table(res.rows);
  }
  await pool.end();
  process.exit(0);
} catch (err) {
  console.error('Error checking duplicates:', err);
  try { await pool.end(); } catch (e) {}
  process.exit(1);
}
