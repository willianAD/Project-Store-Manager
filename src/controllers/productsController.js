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

module.exports = {
  productsAll,
  productsId,
};
