const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const { newSale, newSaleReturn, sale, updatedSaleReturn } = require('./mocks/product.model.mock');

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

  it('retorna venda por id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves(newSale);
    // Act
    const result = await salesModel.getSaleById(1);
    // Assert
    expect(result).to.deep.equal(sale);
  });

  // it('retorna venda por id', async function () {
  //   // Arrange
  //   sinon.stub(connection, 'execute').resolves(newSale);
  //   // Act
  //   const result = await salesModel.getById(1);
  //   // Assert
  //   expect(result).to.deep.equal(sale);
  // });

  it('Recuperando a lista de vendas', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([newSale]);
    // Act
    const result = await salesModel.getAll();
    // Assert
    expect(result).to.be.deep.equal(newSale);
  });

  it('Recuperando a lista de vendas', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([newSale]);
    // Act
    const result = await salesModel.updateSale(5, newSale);
    // Assert
    expect(result).to.be.deep.equal(updatedSaleReturn);
  });
  afterEach(function () {
    sinon.restore();
  });
});