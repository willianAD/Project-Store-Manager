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

module.exports = {
  sales,
  newSales,
};
