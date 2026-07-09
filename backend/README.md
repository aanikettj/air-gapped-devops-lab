# Backend - E-Commerce API

## 📚 Overview

RESTful API built with Node.js, Express, and PostgreSQL for managing an e-commerce platform. Handles user authentication, product management, shopping carts, and orders.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your PostgreSQL credentials

# Start development server
npm run dev

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── config/
│   ├── database.js      # PostgreSQL connection pool
│   └── database.sql     # Database schema
├── controllers/
│   ├── authController.js        # Auth logic
│   ├── productController.js     # Product logic
│   ├── cartController.js        # Cart logic
│   └── orderController.js       # Order logic
├── models/
│   ├── user.js          # User queries
│   ├── product.js       # Product queries
│   ├── cart.js          # Cart queries
│   └── order.js         # Order queries
├── routes/
│   ├── auth.js          # Auth endpoints
│   ├── products.js      # Product endpoints
│   ├── cart.js          # Cart endpoints
│   └── orders.js        # Order endpoints
├── middleware/
│   └── auth.js          # JWT & error handling
├── utils/
│   └── database-init.js # DB initialization
└── server.js            # Main server file
```

## 🔑 Environment Variables

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

## 🗄️ Database Schema

### Users Table
- id (UUID)
- name (VARCHAR)
- email (VARCHAR, UNIQUE)
- password_hash (VARCHAR)
- phone, address, city, state, zip_code
- timestamps

### Products Table
- id (UUID)
- name, description
- price (DECIMAL)
- category (VARCHAR)
- stock_quantity
- image_url
- rating
- timestamps

### Carts & Cart Items
- carts: user_id → cart relationship
- cart_items: cart_id, product_id, quantity

### Orders & Order Items
- orders: user_id, total_amount, status, shipping info
- order_items: order_id, product_id, quantity, price_at_purchase

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get profile (auth required)

### Products
- `GET /api/products?category=X&search=Y` - List products
- `GET /api/products/categories` - Get categories
- `GET /api/products/:id` - Get product details

### Cart (auth required)
- `GET /api/cart` - Get cart
- `POST /api/cart/add` - Add item (productId, quantity)
- `PUT /api/cart/update` - Update item (cartItemId, quantity)
- `DELETE /api/cart/remove` - Remove item (cartItemId)

### Orders (auth required)
- `POST /api/orders/checkout` - Create order (shippingAddress, paymentMethod)
- `GET /api/orders` - List user orders
- `GET /api/orders/:id` - Get order details

## 🔐 Authentication

- JWT tokens issued on login
- Tokens expire after 7 days (configurable)
- Include token in Authorization header: `Bearer <token>`
- Password hashed with bcryptjs (10 rounds)

## ✅ Features

✅ JWT-based authentication
✅ Input validation with express-validator
✅ Error handling middleware
✅ CORS enabled
✅ Database connection pooling
✅ Prepared statements (SQL injection prevention)
✅ Automatic database initialization
✅ Sample product data seeding

## 🧪 Testing API Endpoints

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

### Add to Cart (with token)
```bash
curl -X POST http://localhost:5000/api/cart/add \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productId":"product-uuid","quantity":1}'
```

## 📦 Dependencies

- **express** - Web framework
- **pg** - PostgreSQL driver
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT implementation
- **cors** - CORS middleware
- **express-validator** - Input validation
- **dotenv** - Environment variables
- **uuid** - UUID generation

## 🚀 Deployment

### Heroku
```bash
heroku create app-name
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Production Checklist
- [ ] Change JWT_SECRET to strong random string
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Use strong database password
- [ ] Set appropriate CORS_ORIGIN
- [ ] Enable logging and monitoring
- [ ] Set up backup strategy

## 🔧 Development

```bash
# Install dependencies
npm install

# Install nodemon for auto-restart
npm install -D nodemon

# Run dev server with auto-reload
npm run dev

# Start production server
npm start
```

## 📄 License

MIT
