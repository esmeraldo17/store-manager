const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');

const {
  productListMock,
  newProductMock,
} = require('./mocks/product.controller.mock');

describe('Teste de unidade do productController', function () {
  describe('Listando os produtos', function () {
    it('Deve retornar o status 200 e a lista de todos os produtos', async function () {
      // arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'getAll')
        .resolves({ type: null, message: productListMock });

      // act
      await productController.getAll(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productListMock);
    });
  });


  describe('listando produtos por id', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'getById')
        .resolves({ type: null, message: newProductMock });

      // Act
      await productController.getById(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(newProductMock);
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
        .stub(productService, 'getById')
        .resolves({ type: 'PASSENGER_NOT_FOUND', message: 'Passenger not found' });

      // Act
      await productController.getById(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ "message": "Product not found" });
    });
  });
  

  afterEach(function () {
    sinon.restore();
  });
});