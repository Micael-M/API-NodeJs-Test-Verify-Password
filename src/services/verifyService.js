const verify = (password, _rules) => {
  // validação de caracter repetido
  const regexNoRepeat = /([a-z])\1/i;
  const validateNoRepeat = password.match(regexNoRepeat);

  const regexPassword = /^(?=.*[!@#$%^&*()-+\\/\\{\\}\\[\]])(?=.*[0-9])(?=.*[a-z]).{8,}$/i;
  const validatePassword = password.match(regexPassword);

  if (validateNoRepeat === null && validatePassword) {
    console.log('A senha passou');
    return { status: 200, verify: true, noMatch: [] };
  }

  return { status: 401, verify: true, noMatch: [] };
  // ======== Finalizo Senha correta ====
};

module.exports = { verify };
