const { salesService } = require('../services');

const salesAll = async (_req, res) => {
  const sales = await salesService.getAllSales();

  return res.status(200).json(sales);
};

const salesId = async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.getSalesById(id);

  if (sales.message === 'Sale not found') {
    return res.status(404).json(sales);
  }

  return res.status(200).json(sales[0]);
};

const inserSales = async (req, res) => {
  const { name } = req.body;
  const sales = await salesService.createSales(name);

  if (sales.message === 'Product not insert') {
    return res.status(404).json(sales);
  }

  return res.status(201).json(sales[0]);
};

module.exports = {
  salesAll,
  salesId,
  inserSales,
};
