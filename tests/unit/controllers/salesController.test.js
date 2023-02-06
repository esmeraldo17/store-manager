const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');

const {
  saleListMock,
  newSaleMock,
  saleMock,
} = require('./mocks/product.controller.mock');

describe('Teste de unidade do saleController', function () {
  describe('Teste da funcao createSale', function () {
    it('ao enviar dados válidos deve salvar com sucesso!', async function () {
      // Arrange
      const res = {};
      const req = {
        body: saleMock,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'createSales')
        .resolves({ type: null, message: newSaleMock });

      // Act
      await salesController.createSales2(req, res);

      // Assert

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newSaleMock);
    });
  });
 

  afterEach(function () {
    sinon.restore();
  });
});