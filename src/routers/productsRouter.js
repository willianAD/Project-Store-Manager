const express = require('express');
const { productsController } = require('../controllers');

const validateNameProducts = require('../middlewares/validateNameProducts');

const router = express.Router();

router.get('/search', productsController.searchName);

router.get('/', productsController.productsAll);

router.get('/:id', productsController.productsId);

router.post('/', validateNameProducts, productsController.insertProducts);

router.put('/:id', validateNameProducts, productsController.updateName);

router.delete('/:id', productsController.deleteById);

module.exports = router;
