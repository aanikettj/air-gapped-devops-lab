<<<<<<< HEAD
# Amazon-Style E-Commerce Platform

A full-stack e-commerce application built with React, Node.js, Express, and PostgreSQL. Features product browsing, shopping cart management, user authentication, and order processing.

## 🚀 Project Structure

```
project-root/
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── controllers/ # Route handlers
│   │   ├── models/      # Database queries
│   │   ├── routes/      # API endpoints
│   │   ├── middleware/  # Auth & error handling
│   │   ├── utils/       # Helper functions
│   │   └── server.js    # Main server file
│   ├── package.json
│   └── .env.example
│
└── frontend/            # React SPA
    ├── src/
    │   ├── components/  # React components
    │   ├── pages/       # Page components
    │   ├── redux/       # State management
    │   ├── api/         # API client
    │   ├── styles/      # CSS/Tailwind
    │   ├── App.jsx
    │   └── index.js
    ├── public/
    ├── package.json
    └── .env.example
```

## 📋 Prerequisites

- **Node.js** (v14+)
- **PostgreSQL** (v12+)
- **npm** or **yarn**

## 🔧 Installation & Setup

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your PostgreSQL credentials
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=ecommerce_db
# DB_USER=postgres
# DB_PASSWORD=your_password

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

**Database will be automatically created on first run with:**
- Users table
- Products table (with sample data)
- Shopping Cart tables
- Orders tables

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start the development server
npm start
```

The frontend will run on `http://localhost:3000`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires token)

### Products
- `GET /api/products` - Get all products with filtering
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories` - Get all categories

### Cart (requires authentication)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove` - Remove item from cart

### Orders (requires authentication)
- `POST /api/orders/checkout` - Place new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details

## 🎯 Key Features

✅ **User Authentication** - JWT-based login/register with secure password hashing
✅ **Product Catalog** - Browse products with filtering and search functionality
✅ **Shopping Cart** - Add/remove/update items with persistent storage
✅ **Order Management** - Complete checkout and order history
✅ **Responsive Design** - Mobile-friendly UI with Tailwind CSS
✅ **State Management** - Redux for global cart and auth state
✅ **API Error Handling** - Comprehensive error messages and validation

## 🛠️ Best Practices Implemented

### Backend
- **RESTful API design** with proper HTTP methods and status codes
- **JWT Authentication** for secure API access
- **Input validation** using express-validator
- **Error handling middleware** for consistent error responses
- **Database indexing** for performance optimization
- **Prepared statements** to prevent SQL injection
- **CORS configuration** for frontend communication
- **Environment variables** for sensitive configurations

### Frontend
- **Component-based architecture** for reusability
- **Redux** for centralized state management
- **Axios interceptors** for automatic token injection
- **React Router** for client-side routing
- **Tailwind CSS** for responsive, utility-first styling
- **Error boundaries** and validation
- **Conditional rendering** based on auth state
- **Performance optimization** with lazy loading

## 🔐 Security Features

- Password hashing with bcryptjs (10 salt rounds)
- JWT token-based authentication
- Protected API endpoints
- CORS security headers
- SQL injection prevention with parameterized queries
- Secure token storage in localStorage

## 📦 Dependencies

### Backend
- `express` - Web framework
- `pg` - PostgreSQL client
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT implementation
- `cors` - CORS middleware
- `express-validator` - Input validation

### Frontend
- `react` - UI library
- `react-redux` - State management
- `react-router-dom` - Routing
- `axios` - HTTP client
- `tailwindcss` - CSS framework

## 🚦 Running the Application

### Terminal 1 - Start Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Start Frontend
```bash
cd frontend
npm start
```

### Terminal 3 - PostgreSQL (if using local setup)
```bash
# Make sure PostgreSQL service is running
# On Windows: Services > PostgreSQL
# On Mac: brew services start postgresql
# On Linux: sudo systemctl start postgresql
```

## 📖 Usage Guide

1. **Register/Login** - Create account or sign in
2. **Browse Products** - View all products, filter by category, search
3. **Add to Cart** - Click "Add to Cart" on any product
4. **View Cart** - Review items and quantities
5. **Checkout** - Provide shipping address and payment method
6. **View Orders** - Check order history and details

## 🐛 Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check DB credentials in `.env`
- Verify database name matches

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Set `PORT=3001 npm start`

### CORS Errors
- Ensure `CORS_ORIGIN` in backend `.env` matches frontend URL
- Check API endpoint in frontend `.env`

## 🚀 Deployment

### Backend (Heroku)
```bash
git init
git add .
git commit -m "Initial commit"
heroku create your-app-name
heroku config:set DB_HOST=your_postgres_host
git push heroku main
```

### Frontend (Vercel)
```bash
npm install -g vercel
vercel
```

## 📄 License

MIT

## 👥 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ using React, Node.js, and PostgreSQL**
=======
# air-gapped-devops-lab
>>>>>>> 6ce42dc26fbfe8eec9e970f23477de6f5b23a901
