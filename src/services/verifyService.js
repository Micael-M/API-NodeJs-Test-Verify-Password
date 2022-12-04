const regexRules = {
  regexNoRepeat: /([a-z])\1/gi,
  regexMinUppercase: /[a-z0-9!@#$%^&*()-+\\/\\{\\}\\[\]]/g,
  regexMinLowercase: /[A-Z0-9!@#$%^&*()-+\\/\\{\\}\\[\]]/g,
  regexMinDigit: /[A-Za-z!@#$%^&*()-+\\/\\{\\}\\[\]]/g,
  regexMinSpecialChars: /[a-z0-9]/gi,
};

const verifyNoRepeat = (payload, rule, value, match) => {
  const resultMatch = payload.match(regexRules.regexNoRepeat);
  if (resultMatch && resultMatch.length > value) match.push(rule);
};

const minSpecialChars = (payload, rule, value, match) => {
  const newString = payload.replace(regexRules.regexMinSpecialChars, '');
  if (newString.length < value) match.push(rule);
};

const verifyMinDigit = (payload, rule, value, match) => {
  const newString = payload.replace(regexRules.regexMinDigit, '');
  if (newString.length < value) match.push(rule);
};

const verifyMinLowercase = (payload, rule, value, match) => {
  const newString = payload.replace(regexRules.regexMinLowercase, '');
  if (newString.length < value) match.push(rule);
};

const verifyMinUppercase = (payload, rule, value, match) => {
  const newString = payload.replace(regexRules.regexMinUppercase, '');
  if (newString.length < value) match.push(rule);
};

const verifyMinSize = (payload, rule, value, match) => {
  if (payload.length < value) match.push(rule);
};

const verify = {
  minSize(payload, rule, value, match) { verifyMinSize(payload, rule, value, match); },
  minUppercase(payload, rule, value, match) { verifyMinUppercase(payload, rule, value, match); },
  minLowercase(payload, rule, value, match) { verifyMinLowercase(payload, rule, value, match); },
  minDigit(payload, rule, value, match) { verifyMinDigit(payload, rule, value, match); },
  minSpecialChars(payload, rule, value, match) { minSpecialChars(payload, rule, value, match); },
  noRepeted(payload, rule, value, match) { verifyNoRepeat(payload, rule, value, match); },
};

const verifyPassword = (password, rules) => {
  const noMatch = [];

  for (let i = 0; i < rules.length; i += 1) {
    const { rule, value } = rules[i];

    verify[rule](password, rule, value, noMatch);
  }

  return { status: 200, noMatch };
};

module.exports = {
  verifyPassword,
};
