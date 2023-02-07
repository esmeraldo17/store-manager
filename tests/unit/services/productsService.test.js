const { expect } = require('chai');
const sinon = require('sinon');

const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');

const { products, validName, searchProduct } = require('./mocks/product.service.mock');

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

  describe('cadastro de uma produto com valores válidos', function () {
    it('retorna o ID do produto cadastrado', async function () {
      // arrange
      sinon.stub(productModel, 'insert').resolves(1);
      sinon.stub(productModel, 'getById').resolves(products[0]);

      // act
      const result = await productService.createProduct(validName);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(products[0]);
    });
  });

  describe('actualizacao de uma produto com valores válidos', function () {
    it('retorna o ID do produto cadastrado', async function () {
      // arrange
      sinon.stub(productModel, 'updateProduct').resolves(1, validName);
      sinon.stub(productModel, 'getById').resolves(products[0]);

      // act
      const result = await productService.updateProduct(1, validName);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(products[0]);
    });
  });

  describe(' deletando um produto ', function () {
    it('deleta produto cadastrado', async function () {
      // arrange
      sinon.stub(productModel, 'deleteProduct').resolves(1);

      // act
      const result = await productService.deleteProduct(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal('');
    });
  });

  describe('Pesquisando um produto ', function () {
    it('Pesquisando um produto pelonome', async function () {
      // arrange
      sinon.stub(productModel, 'getAll').resolves(products);
      sinon.stub(productModel, 'getByName').resolves(searchProduct);

      // act
      const result = await productService.getByName('Martelo');

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(searchProduct);
    });
  });
  

  afterEach(function () {
    sinon.restore();
  });
});