const productModel = require('../models');

const getAll = async () => {
  const product = await productModel.getAll();
  return product;
};

const getById = async () => {
  const product = await productModel.getById();
  return product;
};

module.export = {
  getAll,
  getById,
};