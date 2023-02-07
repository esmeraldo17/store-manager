const { salesModel } = require('../models');
// const { getProductById } = require('../models/sales.model');
const { validateSalesInput } = require('./validations.js/validationInputValues');

const createSales = async (body) => {
  const error = validateSalesInput(body);
  if (error.type) return error;

  const newSales = await salesModel.insertToSalesProduts(body);
  // const newSales = await salesModel.getById(newSalesId);

  if (newSales.type) return newSales;

  return { type: null, message: newSales };
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return { type: null, message: sales };
};

const getById = async (id) => {
  const sales = await salesModel.getById(id);
  if (sales.length === 0) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sales };
};

const deleteSale = async (id) => {
  const affectedRows = await salesModel.deleteSale(id);

  if (affectedRows === 0) {
    return { type: 404, message: 'Sale not found' };
  }
  return { type: null, message: '' };
};
const util = async (body) => {
  const product = await Promise.all(body.map(async (e) => {
    const verifyProduct = await salesModel.getProductById(e.productId);
    if (!verifyProduct) return true;
  }));
  return product;
};

const updateSale = async (id, body) => {
  const error = validateSalesInput(body);
  if (error.type) return error;

  const isSaleExist = await salesModel.getSaleById(id);
  const product = await util(body);
  console.log(product);
  if (isSaleExist.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  if (product[0] === true || product[1] === true) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  await salesModel.updateSale(id, body);

  const sale = await getById(id);
  const object = { saleId: id, itemsUpdated: sale.message };

  return { type: null, message: object };
};

module.exports = {
  createSales,
  getAll,
  getById,
  deleteSale,
  updateSale,
};