const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(sinonChai);
chai.use(chaiHttp);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');

const {
  sales,
  newSales,
  saleId,
  message,
  invalid,
} = require('./mocks/salesController.mock');


describe('Testes de unidade do controller das vendas', function () {
  it('Deve retornar o status 200 e todas as vendas', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'findAll')
    .resolves(sales);

    await salesController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sales);
  });

  it('Buscando uma venda a partir do seu id', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'findById')
    .resolves(saleId);

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleId);
  });

  it('Buscando uma venda inválido a partir do seu id', async function () {
    const res = {};
    const req = { params: { id: 99 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'findById')
    .resolves(message);

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(message);
  });

  it('Cadastrando um produto', async function () {
    const res = {};
    const req = { body: newSales };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'insert').resolves(newSales);

    await salesController.createSales(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newSales);
  });

  it('Cadastrando um produto com quantidade invalida', async function () {
    const res = {};
    const req = { body: invalid };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'insert').resolves(invalid);

    await salesController.createSales(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(invalid);
  });

  it('Deleta uma venda com sucesso', async function () {
    const res = {};
    const req = { params: { id: 2 } };

    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    sinon.stub(salesService, 'remove').resolves(1);

    await salesController.deleteById(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.end).to.have.been.calledWith();
  });

  it('Deleta uma venda com id inválido', async function () {
    const res = {};
    const req = { params: { id: 13 }};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'remove').resolves(message);

    await salesController.deleteById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(message);
  });

  afterEach(function () {
    sinon.restore();
  });
});
