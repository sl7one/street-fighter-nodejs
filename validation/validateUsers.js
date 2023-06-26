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

function validateUserUpdate({ firstName, lastName, email, phoneNumber, password, ...rest }) {
  if (typeof firstName !== 'undefined') {
    const isValidFirstName = typeof firstName === 'string' && firstName.length > 0;
    if (!isValidFirstName)
      return {
        isValid: false,
        message: 'firstName',
      };
  }

  if (typeof lastName !== 'undefined') {
    const isValidLastName = typeof lastName === 'string' && lastName.length > 0;
    if (!isValidLastName)
      return {
        isValid: false,
        message: 'lastName',
      };
  }

  if (typeof email !== 'undefined') {
    const isValidEmail = typeof email === 'string' && validateEmail(email);
    if (!isValidEmail)
      return {
        isValid: false,
        message: 'email',
      };
  }

  if (typeof phoneNumber !== 'undefined') {
    const isValidPhoneNumber = typeof phoneNumber === 'string' && validatePhoneNumber(phoneNumber);
    if (!isValidPhoneNumber)
      return {
        isValid: false,
        message: 'phoneNumber',
      };
  }

  if (typeof password !== 'undefined') {
    const isValidPassword = typeof password === 'string' && password.length >= 3;
    if (!isValidPassword)
      return {
        isValid: false,
        message: 'password',
      };
  }

  if (Object.keys(rest).length > 0) return { isValid: false, message: 'Exist another fields' };
  return { isValid: true, message: 'All fields are valid' };
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

export { validateUser, validateUserUpdate };
