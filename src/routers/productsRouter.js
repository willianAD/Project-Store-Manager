const express = require('express');
const { productsController } = require('../controllers');

const validateNameProducts = require('../middlewares/validateNameProducts');

const router = express.Router();

router.get('/', productsController.productsAll);

router.get('/:id', productsController.productsId);

router.post('/', validateNameProducts, productsController.insertProducts);

module.exports = router;
