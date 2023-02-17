const { salesModel, productsModel } = require('../models');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return sales;
};

const findById = async (id) => {
  const salesId = await salesModel.findById(id);

  if (!salesId || !salesId.length) {
    return { message: 'Sale not found' };
  }
  return salesId;
};

const insert = async (sales) => {
  const newSales = await Promise.all(sales.map(async (e) => productsModel
    .findById(e.productId)));

  const verifySale = newSales.every((e) => e.length);

  if (!verifySale) {
    return { message: 'Product not found' };
  }

  const id = await salesModel.insertSales();

  await Promise.all(sales.map(async (e) => salesModel.insert(id, e.productId, e.quantity)));

  return { id, itemsSold: sales };
};

const remove = async (id) => {
  const productsId = await salesModel.findById(id);

  if (!productsId.length) {
    return { message: 'Sale not found' };
  }

  await salesModel.remove(id);
  return productsId;
};

const update = async (saleId, sales) => {
  const verifyId = await salesModel.findById(saleId);

  const product = await Promise.all(sales.map(async (e) => productsModel
  .findById(e.productId)));

  const verifyProduct = product.every((e) => e.length);
  
  if (!verifyId.length) {
    return { message: 'Sale not found' };
  }

  if (!verifyProduct) {
    return { message: 'Product not found' };
  }

  await Promise.all(sales.map(async (e) => salesModel.update(saleId, e.productId, e.quantity)));

  return { saleId, itemsUpdated: sales };
};

module.exports = {
  findAll,
  findById,
  insert,
  remove,
  update,
};
