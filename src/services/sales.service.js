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

module.exports = {
  createSales,
};