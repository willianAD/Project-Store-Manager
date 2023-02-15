const { productsService } = require('../services');

const productsAll = async (_req, res) => {
  const products = await productsService.getAllProducts();

  return res.status(200).json(products);
};

const productsId = async (req, res) => {
  const { id } = req.params;
  const products = await productsService.getProductsById(id);

  if (products.message === 'Product not found') {
    return res.status(404).json(products);
  }

  return res.status(200).json(products[0]);
};

const insertProducts = async (req, res) => {
  const { name } = req.body;
  const products = await productsService.createProduct(name);

  if (products.message === 'Product not insert') {
    return res.status(404).json(products);
  }

  return res.status(201).json(products[0]);
};

const updateName = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  await productsService.update(id, name);
  const newName = await productsService.getProductsById(id);
  
  if (newName.message) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  return res.status(200).json(newName[0]);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const products = await productsService.remove(id);

  if (products.message) {
    return res.status(404).json(products);
  }

  return res.status(204).end();
};

module.exports = {
  productsAll,
  productsId,
  insertProducts,
  updateName,
  deleteById,
};
