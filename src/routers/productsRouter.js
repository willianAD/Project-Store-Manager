const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.productsAll);

router.get('/:id', productsController.productsId);

module.exports = router;
