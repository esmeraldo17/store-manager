const { expect } = require('chai');
const sinon = require('sinon');

const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');

const { sales, salesReturn } = require('./mocks/product.service.mock');

describe('Testes de unidade do service de sales', function () {

  describe('cadastro de uma venda com valores válidos', function () {
    it('retorna o ID do produto cadastrado', async function () {
      // arrange
      sinon.stub(salesModel, 'insertToSalesProduts').resolves(sales);

      // act
      const result = await salesService.createSales(sales);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(sales);
    });
  });

  describe('listagem de vendas', function () {
    it('retorna a lista completa de venas', async function () {
      // arrange
      sinon.stub(salesModel, 'getAll').resolves(sales);

      // act
      const result = await salesService.getAll();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(sales);
    });

  });

  describe('listando vendas por id', function () {
    // it('retorna um erro caso a venda não existe', async function () {
    //   // arrange
    //   sinon.stub(salesModel, 'getById').resolves(undefined);

    //   // act
    //   const result = await salesService.getById(1);

    //   // assert
    //   expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    //   expect(result.message).to.equal('Product not found');
    // });

    it('retorna uma venda caso ID existente', async function () {
      // arrange
      sinon.stub(salesModel, 'getById').resolves(sales[0]);

      // act
      const result = await salesService.getById(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(sales[0]);
    });

  });

  afterEach(function () {
    sinon.restore();
  });
});