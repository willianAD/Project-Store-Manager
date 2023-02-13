const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.productsAll);

router.get('/:id', productsController.productsId);

router.post('/', productsController.insertProducts);

module.exports = router;
