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

  describe('Listando vendas', function () {
    it('Deve retornar o status 200 e a lista de todos as vendas', async function () {
      // arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'getAll')
        .resolves({ type: null, message: saleListMock });

      // act
      await salesController.getAll(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleListMock);
    });
  });
 
  describe('listando vendas por id', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'getById')
        .resolves({ type: null, message: newSaleMock });

      // Act
      await salesController.getById(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(newSaleMock);
    });

    it('deve responder com 404 se o id nao existir', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 3 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'getById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      // Act
      await salesController.getById(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ "message": "Product not found" });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});