import express from 'express';
import { getCart, addItemToCart, updateCartItemQuantity, removeItemFromCart } from '../controllers/cartController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getCart);
router.post('/add', authenticateToken, addItemToCart);
router.put('/update', authenticateToken, updateCartItemQuantity);
router.delete('/remove', authenticateToken, removeItemFromCart);

export default router;
