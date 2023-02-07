const productMock = {
  "name": "Martelo de Thor"
};

const newProductMock = { id: 1, ...productMock };

const productB = [
  {
    "productId": 99,
    "quantity": 7
  },
  {
    "productId": 70,
    "quantity": 50
  }
];

const productBResult = {
  "saleId": "1",
  "itemsUpdated": [
    {
      "date": "2023-02-07T16:00:14.000Z",
      "productId": 1,
      "quantity": 7
    },
    {
      "date": "2023-02-07T16:00:14.000Z",
      "productId": 2,
      "quantity": 50
    }
  ]
};

const productListMock = [newProductMock];

const saleMock = {
  "productId": 1,
  "quantity": 1
};

const newSaleMock = { id: 1, ...productMock };

const saleListMock = [newProductMock];

module.exports = {
  productMock,
  newProductMock,
  productListMock,
  saleMock,
  newSaleMock,
  saleListMock,
  productB,
  productBResult
};