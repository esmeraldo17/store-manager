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
 
  afterEach(function () {
    sinon.restore();
  });
});