const { productModel } = require('../models');
const { validateNewProduct } = require('./validations.js/validationInputValues');

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
  const error = validateNewProduct(name);
  if (error.type) return error;
  
  const newProductId = await productModel.insert(name);
  const newProduct = await productModel.getById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (id, name) => {
  const error = validateNewProduct(name);
  if (error.type) return error;

  await productModel.updateProduct(id, name);

  const product = await productModel.getById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
};