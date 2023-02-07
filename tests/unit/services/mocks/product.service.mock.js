const products = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];

const searchProduct = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  }
];

const sales = [
  {
    "productId": 1,
    "quantity": 1
  }
];

const salesReturn = {
  id: 1,
  intemsSod: [{ productId: 1, quantity: 5 }]
};

const validName = 'Agua Mineral';

module.exports = {
  products,
  validName,
  sales,
  salesReturn,
  searchProduct
};