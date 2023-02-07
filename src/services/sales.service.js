const { salesModel } = require('../models');
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

module.exports = {
  createSales,
  getAll,
  getById,
  deleteSale,
};