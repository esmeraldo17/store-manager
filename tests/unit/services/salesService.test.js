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
  afterEach(function () {
    sinon.restore();
  });
});