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

const deleteProduct = async (id) => {
  const affectedRows = await productModel.deleteProduct(id);

  if (affectedRows === 0) {
    return { type: 404, message: 'Product not found' };
  }
  return { type: null, message: '' };
};

const getByName = async (name) => {
  const emptySearch = await productModel.getAll();
  if (!name) return { type: null, message: emptySearch };
  const products = await productModel.getByName(name);
  console.log(products);
  return { type: null, message: products };
};
module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
  getByName,
};