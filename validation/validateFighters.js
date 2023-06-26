// power — число, 1 ≤ power ≤ 100
// defense — число, 1 ≤ defense ≤ 10
// health — число, 80 ≤ health ≤ 120, необов’язкове поле(за замовчуванням — 100)

function validateFighter({ power, defense, health, name, ...rest }) {
  if (!power && !defense && !health && !name)
    return {
      isValid: false,
      message: 'fields',
    };

  const isValidPower = typeof power === 'number' && power >= 1 && power <= 100;
  if (!isValidPower)
    return {
      isValid: false,
      message: 'power',
    };

  const isValidDefense = typeof defense === 'number' && defense >= 1 && defense <= 10;
  if (!isValidDefense)
    return {
      isValid: false,
      message: 'defense',
    };

  const isValidName = typeof name === 'string' && name.length > 0;
  if (!isValidName)
    return {
      isValid: false,
      message: 'name',
    };

  const isValidHealth = typeof health === 'number' && health >= 80 && health <= 120;
  if (!isValidHealth)
    return {
      isValid: false,
      message: 'health',
    };

  if (Object.keys(rest).length > 0) return { isValid: false, message: 'Exist another fields' };
  return { isValid: true, message: 'All fields are valid' };
}

export { validateFighter };
