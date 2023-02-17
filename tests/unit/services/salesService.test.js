const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

const { sales, saleId, message, newSales, newSaleSuccess } = require('./mocks/salesService.mock');

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
    sinon.stub(salesModel, 'insertSales').resolves(1);
    sinon.stub(salesModel, 'insert').resolves(newSales);
    
    const result = await salesService.insert(newSales);

    expect(result).to.be.deep.equal(newSaleSuccess);
  });

  it('Cadastrando uma venda invalida', async function () {
    sinon.stub(productsModel, 'findById').resolves({ saleId: 99 });
    sinon.stub(salesModel, 'insertSales').resolves(99);
    sinon.stub(salesModel, 'insert').resolves(newSales);
    
    const result = await salesService.insert(newSales);

    expect(result.message).to.be.deep.equal('Product not found');
  });

  it('Deleta uma venda com sucesso', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleId);
    sinon.stub(salesModel, 'remove').resolves(1);

    const result = await salesService.remove(1);

    expect(result).to.be.deep.equal(saleId);
  });

  it('Deleta uma venda com id inválido', async function () {
    sinon.stub(salesModel, 'findById').resolves(99);
    sinon.stub(salesModel, 'remove').resolves(99);

    const result = await salesService.remove(99);

    expect(result).to.be.deep.equal(message);
  });

  afterEach(function () {
    sinon.restore();
  });
});
