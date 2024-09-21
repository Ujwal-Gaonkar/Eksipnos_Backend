import express from 'express';
import { registerUser} from '../controllers/userController';
import { loginUser } from '../controllers/authController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);




export default router;
