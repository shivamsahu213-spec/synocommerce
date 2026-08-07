import { Router } from 'express';
import { authController } from './controllers/auth.controller';
import { authenticate } from './middleware/authenticate';

const router = Router();

// Public Authentication Endpoints
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/verify-email', authController.verifyEmail);

// Protected Authentication Endpoints
router.post('/logout', authenticate, authController.logout);
router.post('/logout-all', authenticate, authController.logoutAll);
router.post('/change-password', authenticate, authController.changePassword);

export default router;
