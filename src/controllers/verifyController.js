const service = require('../services/verifyService');

const verifyPassword = (req, res) => {
  const { password, rules } = req.body;
  const { status, noMatch } = service.verifyPassword(password, rules);
  if (noMatch.length === 0) return res.status(status).json({ verify: true, noMatch });
  return res.status(status).json({ verify: false, noMatch });
};

module.exports = { verifyPassword };
