const service = require('../services/verifyService');

const verifyPassword = async (req, res) => {
  console.log('Cheguei no controller');
  const { password, rules } = req.body;
  const { status, verify, noMatch } = await service.verify(password, rules);
  if (verify) res.status(status).json({ verify, noMatch });
  // return res.status(200).send(resultMatch);

  // try {
  //   const { status, message, resultLogin } = await service.login(username, password);
  //   if (message) return res.status(status).json({ message });
  //   return res.status(status).json(resultLogin);
  // } catch (err) {
  //   return res.status(SERVER_ERROR).json(SERVER_ERROR_MESSAGE);
  // }
};

module.exports = { verifyPassword };
