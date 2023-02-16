const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/conection');
const { sales, newSales } = require('./mocks/salesModel.mock');

describe('Testes de unidade do model das vendas', function () {
  it('Buscando todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);

    const result = await salesModel.findAll();

    expect(result).to.be.deep.equal(sales);
  });

  it('Buscando uma vanda a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([sales[1]]);

    const result = await salesModel.findById(2);

    expect(result).to.be.deep.equal(sales[1]);
  });

  it('Cadastrando uma venda insertSales', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const result = await salesModel.insertSales();

    expect(result).to.equal(1);
  });

  it('Cadastrando uma venda insert', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const result = await salesModel.insert(newSales);

    expect(result).to.be.deep.equal({ insertId: 1 });
  });

  afterEach(function () {
    sinon.restore();
  });
});
