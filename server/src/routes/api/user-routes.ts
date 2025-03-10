import express from 'express';
const router = express.Router();
import {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} from '../../controllers/user-controller.js';

import { authenticateToken } from '../../services/auth.js';

router.route('/').post(createUser).put(authenticateToken, saveBook);
router.route('/login').post(login);
router.route('/me').get(authenticateToken, getSingleUser);
router.route('/books/:bookId').delete(authenticateToken, deleteBook);

export default router;
