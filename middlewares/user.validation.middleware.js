import { error } from '../helpers/error.js';
import { normalizeName } from '../helpers/normalizeName.js';
import { USER } from '../models/user.js';
import { userService } from '../services/userService.js';
import { validateUser, validateUserToUpdate } from '../validation/validateUsers.js';

const searcher = field => {
  return userService.search(field) === null ? true : false;
};

const getAllUsers = (req, res, next) => {
  const userList = userService.getAll();
  req.body = userList;
  return next();
};

const getUserByID = (req, res, next) => {
  const { id } = req.params;
  const user = userService.search({ id });
  if (!user) {
    return next(error(404, `User with ${id} is not defined`));
  }
  req.body = user;
  return next();
};

const deleteUser = (req, res, next) => {
  const { id } = req.params;
  const user = userService.delete(id);
  if (!user) {
    return next(error(404, `User with ${id} is not defined`));
  }
  req.body = user;
  return next();
};

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation

  const { isValid } = validateUser(req.body);
  if (!isValid) {
    return next(error(400, 'User entity to create isn’t valid'));
  }

  req.body = {
    ...req.body,
    firstName: normalizeName(req.body.firstName),
    lastName: normalizeName(req.body.lastName),
    email: req.body.email.trim(),
    phoneNumber: req.body.phoneNumber.trim(),
  };

  const isExistEmail = searcher({ email: req.body.email });
  const isExistPhoneNumber = searcher({ phoneNumber: req.body.phoneNumber });

  if (!isExistEmail) {
    return next(error(400, 'Email exist in database'));
  }
  if (!isExistPhoneNumber) {
    return next(error(400, 'Phone number exist in database'));
  }

  const newUser = userService.create(req.body);
  req.body = newUser;
  return next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update

  const { isValid, message } = validateUserToUpdate(req.body);
  if (!isValid) {
    return next(error(400, 'User entity to create isn’t valid'));
  }

  const isExistEmail = searcher({ email: req.body.email });
  const isExistPhoneNumber = searcher({ phoneNumber: req.body.phoneNumber });

  if (!isExistEmail) {
    return next(error(400, 'Email exist in database'));
  }
  if (!isExistPhoneNumber) {
    return next(error(400, 'Phone number exist in database'));
  }

  const { id } = req.body;
  const updatedUser = userService.update(id, req.body);

  if (!updatedUser) {
    return next(error(404, `User with ${id} is not defined`));
  }
  req.body = updatedUser;

  return next();
};

export { getAllUsers, getUserByID, deleteUser, createUserValid, updateUserValid };
