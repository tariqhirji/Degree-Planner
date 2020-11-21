import express from 'express';
import { 
    forgotPassword,
    login, 
    logout, 
    register 
} from '../controllers/user';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgot_password', forgotPassword);

export default router;