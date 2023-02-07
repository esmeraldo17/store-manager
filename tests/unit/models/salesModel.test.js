const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const { newSale, newSaleReturn } = require('./mocks/product.model.mock');

describe('Testes de unidade do model de sales', function () {
  // it('Cadastrando um produto', async function () {
  //   // Arrange
  //   sinon.stub(connection, 'execute')
  //     .onFirstCall().resolves([[{ id: 1, name: 'Martelo de Thor' }]])
  //     .onSecondCall().resolves([[{ sale_id: 2 }]])
  //     .onCall().resolves();
  //   const result = await salesModel.insertToSalesProduts(newSale);

  //   console.log(result);
  //   // Assert
  //   expect(result).to.equal(newSaleReturn);
  // });
 
  it('deletando uma venda', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    // Act
    const result = await salesModel.deleteSale(1);
    // Assert
    expect(result).to.equal(1);
  });
  afterEach(function () {
    sinon.restore();
  });
});