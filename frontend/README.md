# Frontend - E-Commerce UI

## 📚 Overview

React-based single-page application for an e-commerce platform. Features product browsing, shopping cart management, user authentication, and order tracking.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start development server
npm start
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth.jsx           # Register & Login components
│   ├── ProductList.jsx    # Product browsing & filtering
│   ├── Cart.jsx           # Shopping cart display
│   ├── Checkout.jsx       # Checkout form
│   └── Header.jsx         # Navigation & Orders
├── pages/                 # Page-level components
├── redux/
│   ├── store.js           # Redux store configuration
│   ├── authReducer.js     # Auth state management
│   └── cartReducer.js     # Cart state management
├── api/
│   └── client.js          # Axios API client & endpoints
├── styles/
│   └── index.css          # Global styles
├── App.jsx                # Main app component
└── index.js               # React root
```

## 🔑 Environment Variables

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📦 Pages & Components

### Pages
- **Home** - Product listing with search and filters
- **Register** - User registration form
- **Login** - User login form
- **Cart** - Shopping cart display
- **Checkout** - Order placement form
- **Orders** - Order history and details

### Components
- **Header** - Navigation bar with cart count
- **ProductList** - Products grid with add to cart
- **Cart** - Cart items table with update/delete
- **Checkout** - Shipping and payment form
- **Orders** - Order list and details

## 🎯 State Management (Redux)

### Auth State
```javascript
{
  user: { id, name, email },
  token: "jwt_token",
  loading: false,
  error: null
}
```

### Cart State
```javascript
{
  items: [{ id, product_id, quantity, name, price }],
  total: 1234.56,
  loading: false
}
```

## 🔌 API Integration

### Authentication
```javascript
authAPI.register(name, email, password)
authAPI.login(email, password)
authAPI.getProfile()
```

### Products
```javascript
productAPI.getProducts(category, search, limit, offset)
productAPI.getProduct(id)
productAPI.getCategories()
```

### Cart
```javascript
cartAPI.getCart()
cartAPI.addToCart(productId, quantity)
cartAPI.updateCartItem(cartItemId, quantity)
cartAPI.removeFromCart(cartItemId)
```

### Orders
```javascript
orderAPI.checkout(shippingAddress, paymentMethod)
orderAPI.getOrders()
orderAPI.getOrder(id)
```

## 🎨 Styling

Uses **Tailwind CSS** for utility-first styling:
- Responsive breakpoints (sm, md, lg, xl)
- Color scheme with blue primary
- Custom components in utility classes

## 🔐 Security

- JWT tokens stored in localStorage
- Tokens automatically injected in request headers via Axios interceptor
- Login redirects unauthorized users
- Protected routes check auth token

## 🚀 Features

✅ User registration & login
✅ Product browse & search
✅ Category filtering
✅ Shopping cart management
✅ Order checkout process
✅ Order history tracking
✅ Responsive design
✅ Real-time cart count
✅ Error handling & validation

## 🧪 Component Flow

```
App.jsx (Redux Provider)
├── Router
├── Header (Navigation)
└── Routes
    ├── / → ProductList
    ├── /register → Register
    ├── /login → Login
    ├── /cart → Cart
    ├── /checkout → Checkout
    └── /orders → Orders
```

## 📱 Responsive Breakpoints

- **Mobile** - <640px
- **Tablet** - 640px - 1024px
- **Desktop** - >1024px

## 🔧 Development

```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm start

# Build for production
npm build

# Run tests
npm test
```

## 📦 Dependencies

- **react** - UI library
- **react-dom** - React renderer
- **react-router-dom** - Client-side routing
- **redux** - State management
- **react-redux** - React-Redux bindings
- **axios** - HTTP client
- **tailwindcss** - CSS framework
- **react-scripts** - Build tools

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the build/ folder to Netlify
```

### GitHub Pages
```bash
npm install gh-pages
npm run build
npm run deploy
```

## 🌐 API Integration Points

The app connects to the backend API at:
- Default: `http://localhost:5000/api`
- Configurable via `REACT_APP_API_URL` env variable

## 📄 License

MIT

---

**Built with React, Redux, Tailwind CSS, and Axios**
