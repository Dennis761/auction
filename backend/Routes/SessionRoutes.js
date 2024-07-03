import express from 'express';
import { getAllSessions, getSessionById } from '../Controllers/SessionControllers.js';

const router = express.Router();

router.get('/', getAllSessions);
router.get('/:id', getSessionById);

export default router;
