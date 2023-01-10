import express from 'express';
import userController from '../controllers/userController.mjs';
const router = express.Router();
router.get('/all', userController.getAllUser);
export default router;
