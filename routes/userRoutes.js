import { Router } from 'express';
import { userService } from '../services/userService.js';

import {
  getAllUsers,
  getUserByID,
  deleteUser,
  createUserValid,
  updateUserValid,
} from '../middlewares/user.validation.middleware.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';

const router = Router();

// TODO: Implement route controllers for user

router.get('/', getAllUsers, responseMiddleware);
router.get('/:id', getUserByID, responseMiddleware);
router.post('/', createUserValid, responseMiddleware);
router.put('/:id', updateUserValid, responseMiddleware);
router.delete('/:id', deleteUser, responseMiddleware);

export { router };
