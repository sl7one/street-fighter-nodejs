import { userRepository } from '../repositories/userRepository.js';

class UserService {
  // TODO: Implement methods to work with user

  getAll() {
    return userRepository.getAll();
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  create(newUser) {
    return userRepository.create(newUser);
  }

  update(id, dataToUpdate) {
    const item = userRepository.update(id, dataToUpdate);
    if (!item) {
      return null;
    }
    return item;
  }

  delete(id) {
    const item = userRepository.delete(id);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
