const { expect } = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const { products, newProduct, searchProduct } = require('./mocks/product.model.mock');


describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([products]);
    // Act
    const result = await productModel.getAll();
    // Assert
    expect(result).to.be.deep.equal(products);
  });

  it('Recuperando uma produto a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    // Act
    const result = await productModel.getById(1);
    // Assert
    expect(result).to.be.deep.equal(products[0]);
  });

  it('Cadastrando um produto', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 30 }]);
    // Act
    const result = await productModel.insert(newProduct);
    // Assert
    expect(result).to.equal(30);
  });

  it('actualizando um produto', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 30 }]);
    // Act
    const result = await productModel.updateProduct(1, newProduct);
    // Assert
    expect(result).to.equal(30);
  });

  it('deletando um produto', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    // Act
    const result = await productModel.deleteProduct(1);
    // Assert
    expect(result).to.equal(1);
  });

  it('pesquisando um produto por nome', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([products]);
    // Act
    const result = await productModel.getByName('Martelo');
    // Assert
    expect(result).to.deep.equal(searchProduct);
  });

  afterEach(function () {
    sinon.restore();
  });
});