import express from 'express';
import { signin } from '../controllers/AuthController.mjs';
import { signout } from '../controllers/AuthController.mjs';
import { signup } from '../controllers/AuthController.mjs';
import { Router } from 'express';
import {  authenticateToken} from '../middleware/authMiddleware.mjs';

const router = Router();

router.post('/signin', signin);
router.get('/signout',authenticateToken, signout); 
router.post('/signup', signup);


export default router;
