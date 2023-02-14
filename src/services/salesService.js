const { salesModel } = require('../models');

const getAllSales = async () => {
  const sales = await salesModel.findAll();
  return sales;
};

const getSalesById = async (id) => {
  const salesId = await salesModel.findById(id);

  if (!salesId || !salesId.length) {
    return { message: 'Sale not found' };
  }
  return salesId;
};

const createSales = async (name) => {
  const insert = await salesModel.insert(name);
  const newSales = await salesModel.findById(insert);

  if (!newSales || !newSales.length) {
    return { message: 'Product not insert' };
  }

  return newSales;
};

module.exports = {
  getAllSales,
  getSalesById,
  createSales,
};
