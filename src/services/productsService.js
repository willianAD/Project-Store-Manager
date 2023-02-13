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

const createProduct = async (name) => {
  const insert = await productsModel.insert(name);
  const newProduct = await productsModel.findById(insert);

  if (!newProduct.length) {
    return { message: 'Product not insert' };
  }

  return newProduct;
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
};
