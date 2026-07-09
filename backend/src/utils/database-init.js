import pool from '../config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function initializeDatabase() {
  try {
    const sqlFile = path.join(__dirname, '../config/database.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    
    await pool.query(sql);
    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

export async function seedDatabase() {
  try {
    // Insert sample products with images
    const products = [
      { 
        name: 'Wireless Headphones', 
        description: 'High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium sound quality', 
        price: 129.99, 
        category: 'Electronics', 
        stock_quantity: 50,
        image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'
      },
      { 
        name: 'USB-C Cable', 
        description: 'Durable USB-C charging and data transfer cable, compatible with all devices', 
        price: 19.99, 
        category: 'Accessories', 
        stock_quantity: 200,
        image_url: 'https://picsum.photos/seed/usbcable/500/500'
      },
      { 
        name: 'Laptop Stand', 
        description: 'Adjustable aluminum laptop stand for ergonomic computing', 
        price: 49.99, 
        category: 'Office', 
        stock_quantity: 75,
        image_url: 'https://picsum.photos/seed/laptopstand/500/500'
      },
      { 
        name: '4K Monitor', 
        description: '27-inch 4K ultra HD monitor with vibrant colors and 144Hz refresh rate', 
        price: 399.99, 
        category: 'Electronics', 
        stock_quantity: 25,
        image_url: 'https://picsum.photos/seed/4kmonitor/500/500'
      },
      { 
        name: 'Wireless Mouse', 
        description: 'Ergonomic wireless mouse with precision tracking and long battery life', 
        price: 39.99, 
        category: 'Accessories', 
        stock_quantity: 100,
        image_url: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop'
      },
      {
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard with custom switches and programmable keys',
        price: 149.99,
        category: 'Accessories',
        stock_quantity: 60,
        image_url: 'https://picsum.photos/seed/mechkeyboard/500/500'
      },
      {
        name: 'Webcam HD',
        description: '1080p HD webcam with auto-focus and built-in microphone',
        price: 79.99,
        category: 'Electronics',
        stock_quantity: 45,
        image_url: 'https://picsum.photos/seed/webcamhd/500/500'
      },
      {
        name: 'USB Hub',
        description: '7-port USB 3.0 hub with power adapter',
        price: 34.99,
        category: 'Accessories',
        stock_quantity: 120,
        image_url: 'https://picsum.photos/seed/usbhub/500/500'
      }
    ];

    for (const product of products) {
      await pool.query(
        'INSERT INTO products (name, description, price, category, stock_quantity, image_url) VALUES ($1, $2, $3, $4, $5, $6)',
        [product.name, product.description, product.price, product.category, product.stock_quantity, product.image_url]
      );
    }

    console.log('Sample products inserted successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
