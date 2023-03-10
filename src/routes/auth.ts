import express from 'express';
import { AuthController } from '../controllers/auth.controller';
const router = express.Router();

const authController = new AuthController();

router.post('/', authController.signin);
router.delete('/', authController.signout);

module.exports = router;
