const { productModel } = require('../models');

const getAll = async () => {
  const product = await productModel.getAll();
  return { type: null, message: product };
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

const createProduct = async (name) => {
  const newProductId = await productModel.insert(name);
  const newProduct = await productModel.getById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  getAll,
  getById,
  createProduct,
};