import { normalizeName } from '../helpers/normalizeName.js';
import { error } from '../helpers/error.js';
import { FIGHTER } from '../models/fighter.js';
import { fighterService } from '../services/fighterService.js';
import { validateFighter, validateFighterUpdate } from '../validation/validateFighters.js';

const searcher = field => {
  return fighterService.search(field) === null ? true : false;
};

const getAllFighters = (req, res, next) => {
  const fighterList = fighterService.getAll();
  req.body = fighterList;
  return next();
};

const getFighterByID = (req, res, next) => {
  const { id } = req.params;
  const fighter = fighterService.search({ id });
  if (!fighter) {
    return next(error(404, `Fighter with ${id} is not defined`));
  }
  req.body = fighter;
  return next();
};

const deleteFighter = (req, res, next) => {
  const { id } = req.params;
  const fighter = fighterService.delete(id);
  if (!fighter) {
    return next(error(404, `Fighter with ${id} is not defined`));
  }
  req.body = fighter;
  return next();
};

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation

  if (!req.body.health) {
    req.body.health = 100;
  }

  const { isValid, message } = validateFighter(req.body);
  if (!isValid) {
    return next(error(400, `Fighter entity to create isn’t valid`));
  }

  req.body.name = normalizeName(req.body.name);

  const isExistName = searcher({ name: req.body.name });
  if (!isExistName) {
    return next(error(400, `Fighter name is exist`));
  }

  const newFighter = fighterService.create(req.body);
  req.body = newFighter;
  return next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  const { isValid, message } = validateFighterUpdate(req.body);
  if (!isValid) {
    return next(error(400, `Fighter entity to create isn’t valid`));
  }

  const isExistName = searcher({ name: req.body.name });

  if (!isExistName) {
    return next(error(400, `Fighter name is exist`));
  }

  const { id } = req.body;
  const updatedFighter = fighterService.update(id, req.body);

  if (!updatedFighter) {
    return next(error(404, `Fighter with ${id} is not defined`));
  }

  req.body = updatedFighter;

  return next();
};

export { getAllFighters, getFighterByID, deleteFighter, createFighterValid, updateFighterValid };
