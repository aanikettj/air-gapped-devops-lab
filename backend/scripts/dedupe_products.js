const pool = require('../src/config/database');

(async () => {
  try {
    const dedupeSql = `
      WITH duplicates AS (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY name ORDER BY id) rn
        FROM products
      )
      DELETE FROM products WHERE id IN (SELECT id FROM duplicates WHERE rn > 1);
    `;

    await pool.query(dedupeSql);
    const res = await pool.query('SELECT name, COUNT(*) FROM products GROUP BY name ORDER BY name;');
    console.log('Product counts after dedupe:');
    console.table(res.rows);
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('Dedupe error:', err);
    await pool.end();
    process.exit(1);
  }
})();
