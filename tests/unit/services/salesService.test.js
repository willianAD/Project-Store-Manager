const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

const { sales, saleId, message, newSales, newSaleSuccess, invalidQuantity, invalidProduct } = require('./mocks/salesService.mock');

describe('Testes de unidade do services das vendas', function () {
  it('Buscando todas as vendas', async function () {
    sinon.stub(salesModel, 'findAll').resolves(sales);

    const result = await salesService.findAll();

    expect(result).to.be.deep.equal(sales);
  });

  it('Erro ao buscar uma venda à partir do seu id', async function () {
    sinon.stub(salesModel, 'findById').resolves(4);

    const result = await salesService.findById(4);

    expect(result).to.be.deep.equal(message);
  });

  it('Buscando uma vend à partir do seu id', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleId);

    const result = await salesService.findById(1);

    expect(result).to.be.deep.equal(saleId);
  });

  it('Cadastrando uma venda', async function () {
    sinon.stub(productsModel, 'findById').resolves([{ saleId: 1 }]);
    sinon.stub(salesModel, 'insertSales').resolves(newSales);
    sinon.stub(salesModel, 'insert').resolves(newSaleSuccess);
    
    const result = await salesService.insert([{ id: 3}], newSales);

    expect(result).to.be.deep.equal(newSaleSuccess);
  });

  it('Cadastrando uma venda invalida', async function () {
    sinon.stub(productsModel, 'findById').resolves({ saleId: 5 });
    sinon.stub(salesModel, 'insertSales').resolves(newSales);

    const result = await salesService.insert(newSales);

    expect(result.message).to.be.deep.equal("Product not found");
  });

  // it('Cadastrando uma venda com quantidade invalida', async function () {
  //   sinon.stub(productsModel, 'findById').resolves({ saleId: 1 });
  //   sinon.stub(salesModel, 'insertSales').resolves(invalidQuantity);

  //   const result = await salesService.insert(invalidQuantity);

  //   expect(result.message).to.be.deep.equal("\"quantity\" must be greater than or equal to 1" );
  // });

  // it('Cadastrando uma venda com productId invalido', async function () {
  //   sinon.stub(productsModel, 'findById').resolves({ saleId: 1 });
  //   sinon.stub(salesModel, 'insertSales').resolves(invalidProduct);

  //   const result = await salesService.insert(invalidProduct);

  //   expect(result.message).to.be.deep.equal("\"productId\" is required");
  // });

  afterEach(function () {
    sinon.restore();
  });
});
