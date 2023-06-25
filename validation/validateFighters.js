// power — число, 1 ≤ power ≤ 100
// defense — число, 1 ≤ defense ≤ 10
// health — число, 80 ≤ health ≤ 120, необов’язкове поле(за замовчуванням — 100)

function validateFighter(fighter) {
  if (!fighter.power || !fighter.defense || !fighter.health || !fighter.name) {
    return { isValid: false, message: 'invalid fields' };
  }

  if (typeof fighter.power !== 'number' || fighter.power < 1 || fighter.power > 100) {
    return { isValid: false, message: 'power' };
  }

  if (typeof fighter.defense !== 'number' || fighter.defense < 1 || fighter.defense > 10) {
    return { isValid: false, message: 'defense' };
  }

  if (typeof fighter.health !== 'number' || fighter.health < 80 || fighter.health > 120) {
    return { isValid: false, message: 'health' };
  }

  if (typeof fighter.name !== 'string' || fighter.name.trim() === '') {
    return { isValid: false, message: 'name' };
  }

  return { isValid: true, message: 'All fiels are valid' };
}
function validateFighterToUpdate(fighter) {
  const validation = [];

  if (fighter.power || fighter.power === 0)
    validation.push({
      isValid: typeof fighter.power === 'number' && fighter.power >= 1 && fighter.power <= 100,
      message: 'power',
    });

  if (fighter.defense || fighter.defense === 0) {
    validation.push({
      isValid: typeof fighter.defense === 'number' && fighter.defense >= 1 && fighter.defense <= 10,
      message: 'defense',
    });
  }

  if (fighter.health || fighter.health === 0) {
    validation.push({
      isValid: typeof fighter.health === 'number' && fighter.health >= 80 && fighter.health <= 120,
      message: 'health',
    });
  }

  if (fighter.name || fighter.name === '') {
    validation.push({
      isValid: typeof fighter.name === 'string' && fighter.name.length > 0,
      message: 'name',
    });
  }

  if (validation.length === 0) return { isValid: false, message: 'No fields to validate' };

  if (validation.every(({ isValid }) => isValid)) {
    return { isValid: true, message: 'All fields is valid' };
  } else {
    return {
      isValid: false,
      message: `Some fields is not valid: ${validation
        .filter(({ isValid }) => !isValid)
        .map(({ message }) => message)
        .join(', ')}`,
    };
  }
}

export { validateFighter, validateFighterToUpdate };
