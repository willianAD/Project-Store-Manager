const express = require('express');
const { salesController } = require('../controllers');

const validateQuantitySales = require('../middlewares/validateQuantitySales');
const validateProductSales = require('../middlewares/validateProductSales');

const router = express.Router();

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getSalesById);

router.post('/', validateProductSales, validateQuantitySales, salesController.createSales);

router.delete('/:id', salesController.deleteById);

module.exports = router;
