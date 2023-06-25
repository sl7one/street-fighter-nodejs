import { Router } from 'express';
import { fighterService } from '../services/fighterService.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';
import {
  createFighterValid,
  deleteFighter,
  getAllFighters,
  getFighterByID,
  updateFighterValid,
} from '../middlewares/fighter.validation.middleware.js';

const router = Router();

// TODO: Implement route controllers for fighter

router.get('/', getAllFighters, responseMiddleware);
router.get('/:id', getFighterByID, responseMiddleware);
router.post('/', createFighterValid, responseMiddleware);
router.put('/:id', updateFighterValid, responseMiddleware);
router.delete('/:id', deleteFighter, responseMiddleware);

export { router };
