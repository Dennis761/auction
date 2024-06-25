import express from 'express';
import { getAllProducts, createProduct, getProductById } from '../Controllers/ProductControllers.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/:id', getProductById);

export default router;
