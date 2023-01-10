import ex from 'express';
import userRoute from './userRoute';
const router = ex.Router();
router.use('/user', userRoute);
export default router;
