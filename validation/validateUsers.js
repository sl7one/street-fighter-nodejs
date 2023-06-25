function validateUser({ firstName, lastName, email, phoneNumber, password, ...rest }) {
  if (!firstName && !lastName && !email && !phoneNumber && !password)
    return {
      isValid: false,
      message: 'fields',
    };

  const isValidFirstName = typeof firstName === 'string' && firstName.length > 0;
  if (!isValidFirstName) {
    return { isValid: false, message: 'firstName' };
  }

  const isValidLastName = typeof lastName === 'string' && lastName.length > 0;
  if (!isValidLastName) {
    return { isValid: false, message: 'lastName' };
  }

  const isValidEmail = typeof email === 'string' && validateEmail(email);
  if (!isValidEmail) {
    return { isValid: false, message: 'email' };
  }

  const isValidPhoneNumber = typeof phoneNumber === 'string' && validatePhoneNumber(phoneNumber);
  if (!isValidPhoneNumber) {
    return { isValid: false, message: 'phoneNumber' };
  }

  const isValidPassword = typeof password === 'string' && password.length >= 3;
  if (!isValidPassword) {
    return { isValid: false, message: 'password' };
  }

  if (Object.keys(rest).length > 0) return { isValid: false, message: 'Exist another fields' };
  return { isValid: true, message: 'All fields are valid' };
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
