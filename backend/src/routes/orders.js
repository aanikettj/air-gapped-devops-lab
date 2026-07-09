import express from 'express';
import { checkout, getOrders, getOrder } from '../controllers/orderController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/checkout', authenticateToken, checkout);
router.get('/', authenticateToken, getOrders);
router.get('/:id', authenticateToken, getOrder);

export default router;
