import { getCartByUserId, createCart, getCartItems, addToCart, updateCartItem, removeFromCart, clearCart } from '../models/cart.js';
import { getProductById } from '../models/product.js';

export const getCart = async (req, res) => {
  try {
    let cart = await getCartByUserId(req.user.id);

    if (!cart) {
      cart = await createCart(req.user.id);
    }

    const items = await getCartItems(cart.id);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({ cart: { id: cart.id, items, total } });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Failed to fetch cart', error: error.message });
  }
};

export const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Product ID and valid quantity are required' });
    }

    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock_quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    let cart = await getCartByUserId(req.user.id);
    if (!cart) {
      cart = await createCart(req.user.id);
    }

    await addToCart(cart.id, productId, quantity);

    const items = await getCartItems(cart.id);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({ message: 'Item added to cart', cart: { id: cart.id, items, total } });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Failed to add item to cart', error: error.message });
  }
};

export const updateCartItemQuantity = async (req, res) => {
  try {
    const { cartItemId, quantity } = req.body;

    if (!cartItemId || quantity < 0) {
      return res.status(400).json({ message: 'Cart item ID and valid quantity are required' });
    }

    await updateCartItem(cartItemId, quantity);

    const cart = await getCartByUserId(req.user.id);
    const items = await getCartItems(cart.id);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({ message: 'Cart item updated', cart: { id: cart.id, items, total } });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: 'Failed to update cart', error: error.message });
  }
};

export const removeItemFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.body;

    if (!cartItemId) {
      return res.status(400).json({ message: 'Cart item ID is required' });
    }

    await removeFromCart(cartItemId);

    const cart = await getCartByUserId(req.user.id);
    const items = await getCartItems(cart.id);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({ message: 'Item removed from cart', cart: { id: cart.id, items, total } });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Failed to remove item from cart', error: error.message });
  }
};
