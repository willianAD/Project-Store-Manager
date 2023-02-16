const products = [
  {
    id: 1,
    name: "Martelo de Thor"
  },
  {
    id: 2,
    name: "Traje de encolhimento"
  },
  {
    id: 3,
    name: "Escudo do Capitão América"
  },
];

const product1 =  { id: 1, name: "Martelo de Thor" };

const messageError = { message: 'Product not found' };

const messageError2 = { message: 'Product not insert' };

const newProduct = { name: "ProdutoX" };

const newName = { name: 'Martelo do Batman'};

module.exports = {
  products,
  product1,
  messageError,
  messageError2,
  newProduct,
  newName,
};
