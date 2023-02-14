const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(sinonChai);
chai.use(chaiHttp);

const app = require('../../../src/app');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const connection = require('../../../src/models/conection');

const { products, product1, messageError, newProduct, messageError2 } = require('./mocks/productsController.mock');


describe('Testes de unidade do controller dos produtos', function () {
  it('Deve retornar o status 200 e todos os produtos', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getAllProducts')
    .resolves(products);

    await productsController.productsAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  it('Buscando um produto a partir do seu id', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getProductsById')
    .resolves([product1]);

    await productsController.productsId(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(product1);
  });

  it('Buscando um produto inválido a partir do seu id', async function () {
    const res = {};
    const req = { params: { id: 99 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getProductsById')
    .resolves(messageError);

    await productsController.productsId(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(messageError);
  });

  it('Cadastrando um produto', async function () {
    const res = {};
    const req = { body: { name: 'ProdutoX' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'createProduct')
    .resolves([newProduct]);

    await productsController.insertProducts(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });

  it('Cadastrando um produto inválido', async function () {
    const res = {};
    const req = { body: { name: 'AAA' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'createProduct')
    .resolves(messageError2);

    await productsController.insertProducts(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(messageError2);
  });

  afterEach(function () {
    sinon.restore();
  });
});
