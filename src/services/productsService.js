const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.findAll();
  return products;
};

const getProductsById = async (id) => {
  const productsId = await productsModel.findById(id);

  if (!productsId || !productsId.length) {
    return { message: 'Product not found' };
  }
  return productsId;
};

const createProduct = async (name) => {
  const insert = await productsModel.insert(name);
  const newProduct = await productsModel.findById(insert);

  if (!newProduct || !newProduct.length) {
    return { message: 'Product not insert' };
  }

  return newProduct;
};

const update = async (id, name) => {
  const productsId = await productsModel.findById(id);

  if (!productsId.length) {
    return { message: 'Product not found' };
  }
  
  await productsModel.update(id, name);
  
  return productsId;
};

const remove = async (id) => {
  const productsId = await productsModel.findById(id);

  if (!productsId.length) {
    return { message: 'Product not found' };
  }

  await productsModel.remove(id);
  return productsId;
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  update,
  remove,
};
