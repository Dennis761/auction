import express from 'express';
import { createSession, getAllSessions, getSessionById } from '../Controllers/SessionControllers.js';

import checkAuth from '../Middlewares/CheckAuth.js'

const router = express.Router();

console.log(router)

router.post('/', checkAuth, createSession);
router.get('/', getAllSessions);
router.get('/:id', getSessionById);

export default router;
