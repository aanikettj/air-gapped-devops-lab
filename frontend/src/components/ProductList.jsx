import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productAPI, cartAPI } from '../api/client.js';
import { setCart } from '../redux/cartReducer.js';

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productAPI.getCategories();
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productAPI.getProducts(selectedCategory, searchTerm);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };

    fetchCategories();
    fetchProducts();
  }, [selectedCategory, searchTerm]);

  const handleAddToCart = async (productId) => {
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      const response = await cartAPI.addToCart(productId, 1);
      dispatch(setCart(response.data.cart.items, response.data.cart.total));
      alert('Item added to cart!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add item to cart');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Products</h1>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium ${!selectedCategory ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border'}`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105">
                <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="w-full h-full object-cover hover:scale-110 transition duration-300"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=' + encodeURIComponent(product.name); }}
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      <div className="text-4xl mb-2">📦</div>
                      <div>No image</div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-blue-600">${parseFloat(product.price).toFixed(2)}</span>
                      <span className="text-xs text-gray-500">{product.stock_quantity} in stock</span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product.stock_quantity === 0}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 transition font-medium text-sm"
                    >
                      {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
