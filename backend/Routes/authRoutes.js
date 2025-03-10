import express from 'express';
import { login, register } from '../Controllers/authControllers.js';

const router = express.Router();

router.post('/login', login);
router.post('/registration', register);

export default router;
