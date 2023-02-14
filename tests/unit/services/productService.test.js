const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

const connection = require('../../../src/models/conection');
const { products, newProduct, message } = require('./mocks/productsService.mock');

describe('Testes de unidade do services dos produtos', function () {
  it('Buscando todos os produtos', async function () {
    sinon.stub(productsModel, 'findAll').resolves(products);

    const result = await productsService.getAllProducts();

    expect(result).to.be.deep.equal(products);
  });

  it('Erro ao buscar um produto a partir do seu id', async function () {
    sinon.stub(productsModel, 'findById').resolves(4);

    const result = await productsService.getProductsById(15);

    expect(result).to.be.deep.equal(message);
  });

  it('Buscando um produto a partir do seu id', async function () {
    sinon.stub(productsModel, 'findById').resolves(products[0]);

    const result = await productsService.getProductsById(1);

    expect(result).to.be.deep.equal(products[0]);
  });

  it('Cadastrando um produto invalido', async function () {
    sinon.stub(productsModel, 'insert').resolves(1);
    sinon.stub(productsModel, 'findById').resolves(products[0]);

    const result = await productsService.createProduct('a');

    expect(result.message).to.be.deep.equal('Product not insert');
  });

  it('Cadastrando um produto', async function () {
    sinon.stub(productsModel, 'insert').resolves(1);
    sinon.stub(productsModel, 'findById').resolves(products[0]);
    
    const result = await productsService.createProduct('ProdutoX');

    expect(result).to.be.deep.equal([products[3]]);
  });

  afterEach(function () {
    sinon.restore();
  });
});
