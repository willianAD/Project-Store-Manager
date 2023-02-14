const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get('/', salesController.salesAll);

router.get('/:id', salesController.salesId);

router.post('/', salesController.inserSales);

module.exports = router;
