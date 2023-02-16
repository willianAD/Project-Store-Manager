const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

const { products, message } = require('./mocks/productsService.mock');

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
    sinon.stub(productsModel, 'findById').resolves([products[0]]);

    const result = await productsService.getProductsById(1);

    expect(result).to.be.deep.equal([products[0]]);
  });

  it('Cadastrando um produto invalido', async function () {
    sinon.stub(productsModel, 'insert').resolves(1);
    sinon.stub(productsModel, 'findById').resolves();

    const result = await productsService.createProduct('AAA');

    expect(result.message).to.be.deep.equal('Product not insert');
  });

  it('Cadastrando um produto', async function () {
    sinon.stub(productsModel, 'insert').resolves(1);
    sinon.stub(productsModel, 'findById').resolves([products[3]]);
    
    const result = await productsService.createProduct('ProdutoX');

    expect(result).to.be.deep.equal([products[3]]);
  });

  it('Alterando um produto a partir do seu id', async function () {
    sinon.stub(productsModel, 'findById').resolves([products[0]]);
    sinon.stub(productsModel, 'update').resolves({ affectedRows: 1 });

    const result = await productsService.update([products[0]]);

    expect(result).to.be.deep.equal([products[0]]);
  });

  it('Alterando um produto com id inválido', async function () {
    sinon.stub(productsModel, 'findById').resolves(13);
    sinon.stub(productsModel, 'update').resolves({ affectedRows: 0 });

    const result = await productsService.update([products[0]]);

    expect(result).to.be.deep.equal(message);
  });

  it('Deleta um produto e não retorna nada', async function () {
    sinon.stub(productsModel, 'findById').resolves([products[0]]);
    sinon.stub(productsModel, 'remove').resolves(1);

    const result = await productsService.remove(1);

    expect(result).to.be.deep.equal([products[0]]);
  });

  it('Deleta um produto com id inexistente', async function () {
    sinon.stub(productsModel, 'findById').resolves(99);
    sinon.stub(productsModel, 'remove').resolves(1);

    const result = await productsService.remove(1);

    expect(result).to.be.deep.equal(message);
  });

  afterEach(function () {
    sinon.restore();
  });
});
