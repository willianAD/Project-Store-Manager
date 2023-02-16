const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/conection');
const { products, newProduct, updateName } = require('./mocks/productsModel.mock');

describe('Testes de unidade do model dos produtos', function () {
  it('Buscando todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productsModel.findAll();

    expect(result).to.be.deep.equal(products);
  });

  it('Buscando um produto a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([products[1]]);

    const result = await productsModel.findById(2);

    expect(result).to.be.deep.equal(products[1]);
  });

  it('Cadastrando um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const result = await productsModel.insert(newProduct);

    expect(result).to.equal(4);
  });

  it('Alterando um produto a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([1, updateName]);

    const result = await productsModel.update(1, updateName);

    expect(result).to.be.deep.equal(1, updateName);
  });

  it('Deleta um produto e não retorna nada', async function () {
    sinon.stub(connection, 'execute').resolves(undefined);

    const result = await productsModel.remove(1);

    expect(result).to.be.equal(undefined);
  });

  afterEach(function () {
    sinon.restore();
  });
});
