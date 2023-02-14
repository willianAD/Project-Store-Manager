const { salesModel } = require('../models');

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

const insert = async (name) => {
  const create = await salesModel.insert(name);
  const newSales = await salesModel.findById(create);

  if (!newSales || !newSales.length) {
    return { message: 'Product not insert' };
  }

  return newSales;
};

module.exports = {
  findAll,
  findById,
  insert,
};
