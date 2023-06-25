const normalizeName = name => {
  return name
    .trim()
    .toLowerCase()
    .split(' ')
    .map(el => {
      const [firstChar, ...rest] = el.split('');
      return [firstChar.toUpperCase(), ...rest].join('');
    })
    .join(' ');
};

export { normalizeName };
