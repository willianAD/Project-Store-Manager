const sales = [
  {
    "saleId": 1,
    "date": "2023-02-15T14:40:47.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-02-15T14:40:47.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-02-15T14:40:47.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const newSales = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const invalidQuantity = [
  {
    "productId": 1,
    "quantity": 0
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const invalidProduct = [
  {
    "quantity": 0
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const newSaleSuccess = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
};

const saleId = [
  {
    "date": "2023-02-15T19:35:15.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-02-15T19:35:15.000Z",
    "productId": 2,
    "quantity": 10
  }
];

const message = { message: 'Sale not found' };

module.exports = {
  sales,
  newSales,
  saleId,
  message,
  newSaleSuccess,
  invalidQuantity,
  invalidProduct,
};
