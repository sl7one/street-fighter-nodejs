import { fighterRepository } from '../repositories/fighterRepository.js';

class FighterService {
  // TODO: Implement methods to work with fighters
  getAll() {
    return fighterRepository.getAll();
  }

  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  create(newUser) {
    return fighterRepository.create(newUser);
  }

  update(id, dataToUpdate) {
    const item = fighterRepository.update(id, dataToUpdate);
    if (!item) {
      return null;
    }
    return item;
  }

  delete(id) {
    const item = fighterRepository.delete(id);
    if (!item) {
      return null;
    }
    return item;
  }
}

const fighterService = new FighterService();

export { fighterService };
