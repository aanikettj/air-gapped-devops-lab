import express from 'express';
import { getProducts, getProduct, getCategoriesList, updateProductImage } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/categories', getCategoriesList);
router.get('/:id', getProduct);
router.put('/image', updateProductImage);

export default router;
