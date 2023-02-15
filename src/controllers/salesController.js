const { salesService } = require('../services');

const getAllSales = async (_req, res) => {
  const sales = await salesService.findAll();

  return res.status(200).json(sales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.findById(id);

  if (sales.message === 'Sale not found') {
    return res.status(404).json(sales);
  }

  return res.status(200).json(sales);
};

const createSales = async (req, res) => {
  const sales = req.body;
  const newSales = await salesService.insert(sales);

  if (newSales.message) {
    return res.status(404).json(newSales);
  }

  return res.status(201).json(newSales);
};

module.exports = {
  getAllSales,
  getSalesById,
  createSales,
};
