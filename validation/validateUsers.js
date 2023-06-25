function validateUser(user) {
  if (!user.firstName || typeof user.firstName !== 'string') {
    return { isValid: false, message: 'firstName' };
  }
  if (!user.lastName || typeof user.lastName !== 'string') {
    return { isValid: false, message: 'lastName' };
  }
  if (!user.email || typeof user.email !== 'string' || !validateEmail(user.email)) {
    return { isValid: false, message: 'email' };
  }
  if (
    !user.phoneNumber ||
    typeof user.phoneNumber !== 'string' ||
    !validatePhoneNumber(user.phoneNumber)
  ) {
    return { isValid: false, message: 'phoneNumber' };
  }
  if (!user.password || typeof user.password !== 'string' || user.password.length < 3) {
    return { isValid: false, message: 'password' };
  }

  return { isValid: true, message: 'All fields valid' };
}

function validateUserToUpdate(user) {
  const validation = [];

  if (user.firstName || user.firstName === '') {
    validation.push({
      isValid: typeof user.firstName === 'string' && user.firstName.length > 0,
      message: 'firstName',
    });
  }

  if (user.lastName || user.lastName === '') {
    validation.push({
      isValid: typeof user.lastName === 'string' && user.lastName.length > 0,
      message: 'lastName',
    });
  }

  if (user.email || user.email === '') {
    validation.push({
      isValid: typeof user.email === 'string' && validateEmail(user.email),
      message: 'email',
    });
  }

  if (user.phoneNumber || user.phoneNumber === '') {
    validation.push({
      isValid: typeof user.phoneNumber === 'string' && validatePhoneNumber(user.phoneNumber),
      message: 'phoneNumber',
    });
  }

  if (user.password || user.password === '') {
    validation.push({
      isValid: typeof user.password === 'string' && user.password.length >= 3,
      message: 'password',
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

function validateEmail(email) {
  // Регулярное выражение для проверки email
  const emailRegex = /^[^\s@]+@gmail\.com$/;
  return emailRegex.test(email);
}

function validatePhoneNumber(phoneNumber) {
  // Регулярное выражение для проверки номера телефона
  const phoneRegex = /^\+380\d{9}$/;
  return phoneRegex.test(phoneNumber);
}

export { validateUser, validateUserToUpdate };
