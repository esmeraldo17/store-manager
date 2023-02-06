const productMock = {
  "name": "Martelo de Thor"
};

const newProductMock = { id: 1, ...productMock };

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
};