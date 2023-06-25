import { normalizeName } from '../helpers/normalizeName.js';
import { error } from '../helpers/error.js';
import { FIGHTER } from '../models/fighter.js';
import { fighterService } from '../services/fighterService.js';
import { validateFighter, validateFighterToUpdate } from '../validation/validateFighters.js';

const searcher = field => {
  return userService.search(field) === null ? true : false;
};

const getAllFighters = (req, res, next) => {
  const userList = fighterService.getAll();
  req.body = userList;
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

  req.body.name = normalizeName(req.body.name);

  const isExistName = searcher({ name: req.body.name });
  if (isExistName) {
    return next(error(400, `Fighter name is exist`));
  }

  if (!req.body.health) {
    req.body.health = 100;
  }

  const { isValid } = validateFighter(req.body);
  if (!isValid) {
    return next(error(400, `Fighter entity to create isn’t valid`));
  }

  const newUser = fighterService.create(req.body);
  req.body = newUser;
  return next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  const isExistName = searcher({ name: req.body.name });
  if (isExistName) {
    return next(error(400, `Fighter name is exist`));
  }

  const { isValid, message } = validateFighterToUpdate(req.body);

  if (!isValid) {
    return next(error(400, `Fighter entity to create isn’t valid`));
  }

  const { id } = req.body;
  const updatedUser = fighterService.update(id, req.body);

  if (!updatedUser) {
    return next(error(404, `Fighter with ${id} is not defined`));
  }

  req.body = updatedUser;

  return next();
};

export { getAllFighters, getFighterByID, deleteFighter, createFighterValid, updateFighterValid };
