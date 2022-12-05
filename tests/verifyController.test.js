const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const app = require('../src/app');

chai.use(chaiHttp);

const mockValidPassword = {
  password: 'TesteSenhaForte!1234&',
  rules: [
    { rule: 'minSize', value: 8 },
    { rule: 'minSpecialChars', value: 2 },
    { rule: 'noRepeted', value: 0 },
    { rule: 'minDigit', value: 4 },
  ],
};

const mockInvalidPassword = {
  password: 'TesteSenhaForte!1&',
  rules: [
    { rule: 'minSize', value: 8 },
    { rule: 'minSpecialChars', value: 2 },
    { rule: 'noRepeted', value: 0 },
    { rule: 'minDigit', value: 4 },
  ],
};

const mockRulesNull = {
  password: 'TesteSenhaForte!123&',
  rules: [],
};

describe('Ao acessar a rota /verify', function () {
  const requestEndpoint = async (payload) => {
    const response = await chai
      .request(app)
      .post('/verify')
      .send(payload);
    return response;
  };
  describe('Retorna "status 200"', function () {
    it('Caso a senha seja válida', async function () {
      const response = await requestEndpoint(mockValidPassword);
      expect(response.status).to.be.equal(200);
    });

    it('Caso a senha seja inválida', async function () {
      const response = await requestEndpoint(mockRulesNull);
      expect(response.status).to.be.equal(200);
    });
  });

  describe('Retorna "verify: true"', function () {
    it('Caso a senha seja válida', async function () {
      const response = await requestEndpoint(mockValidPassword);
      expect(response.body.verify).to.be.equal(true);
    });
  });

  describe('Retorna "verify: false"', function () {
    it('Caso a senha seja inválida', async function () {
      const response = await requestEndpoint(mockInvalidPassword);
      expect(response.body.verify).to.be.equal(false);
    });
  });
});
