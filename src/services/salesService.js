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

module.exports = {
  findAll,
  findById,
  insert,
};
