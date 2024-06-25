import express from 'express';
import { createSession, getAllSessions, getSessionById } from '../Controllers/SessionControllers.js';

import checkAuth from '../Middlewares/CheckAuth.js'

const router = express.Router();

console.log(router)

router.post('/', createSession);
router.get('/', getAllSessions);
router.get('/:id', getSessionById);
// router.get('/join/:id', checkAuth, joinSession);
// router.get('/leave/:id', checkAuth, leaveSession);

export default router;
