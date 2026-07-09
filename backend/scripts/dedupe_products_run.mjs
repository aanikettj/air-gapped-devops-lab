import pool from '../src/config/database.js';

try {
  const dupRes = await pool.query(`SELECT name, array_agg(id ORDER BY id) AS ids FROM products GROUP BY name HAVING COUNT(*) > 1;`);
  if (dupRes.rows.length === 0) {
    console.log('No duplicate product names found.');
  } else {
    for (const row of dupRes.rows) {
      const ids = row.ids;
      const keepId = ids[0];
      const dupIds = ids.slice(1);
      console.log(`Consolidating ${row.name}: keeping ${keepId}, merging ${dupIds.length} duplicates`);
      // Update foreign keys in cart_items and order_items
      await pool.query('UPDATE cart_items SET product_id = $1 WHERE product_id = ANY($2)', [keepId, dupIds]);
      await pool.query('UPDATE order_items SET product_id = $1 WHERE product_id = ANY($2)', [keepId, dupIds]);
      // Delete duplicate product rows
      await pool.query('DELETE FROM products WHERE id = ANY($1)', [dupIds]);
    }
  }

  const res = await pool.query('SELECT name, COUNT(*) FROM products GROUP BY name ORDER BY name;');
  console.log('Product counts after dedupe:');
  console.table(res.rows);
  await pool.end();
  process.exit(0);
} catch (err) {
  console.error('Dedupe error:', err);
  try { await pool.end(); } catch(e) {}
  process.exit(1);
}
