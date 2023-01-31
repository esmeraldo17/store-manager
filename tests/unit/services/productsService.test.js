const { expect } = require('chai');
const sinon = require('sinon');

const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');

const { products } = require('./mocks/product.service.mock');

describe('Verificando service product', function () {
  describe('listagem de produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      // arrange
      sinon.stub(productModel, 'getAll').resolves(products);

      // act
      const result = await productService.getAll();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(products);
    });
  });


  describe('listando produtos por id', function () {
    it('retorna um erro caso a produto não existe', async function () {
      // arrange
      sinon.stub(productModel, 'getById').resolves(undefined);

      // act
      const result = await productService.getById(1);

      // assert
      expect(result.type).to.equal('PASSENGER_NOT_FOUND');
      expect(result.message).to.equal('Passenger not found');
    });

    it('retorna a produto caso ID existente', async function () {
      // arrange
      sinon.stub(productModel, 'getById').resolves(products[0]);

      // act
      const result = await productService.getById(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(products[0]);
    });

  });
  

  afterEach(function () {
    sinon.restore();
  });
});