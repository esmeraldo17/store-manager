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

const newProduct = { name: 'agua' };

const searchProduct = [{ id: 1, name: 'Martelo de Thor'}];

const newSale = [
  {
    "productId": 1,
    "quantity": 5
  }
]

const newSaleReturn = {
  "id": 5,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 5
    }
  ]
}

module.exports = {
  products,
  newProduct,
  newSale,
  newSaleReturn,
  searchProduct
};