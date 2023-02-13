const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.findAll();
  return products;
};

const getProductsById = async (id) => {
  const productsId = await productsModel.findById(id);

  if (!productsId.length) {
    return { message: 'Product not found' };
  }
  return productsId;
};

module.exports = {
  getAllProducts,
  getProductsById,
};
