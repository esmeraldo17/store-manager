const productService = require('../services');

const getAll = async (_req, res) => {
  const products = await productService.getAll();
  res.status(200).json(products.message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const products = await productService.getById(id);
  res.status(200).json(products.message);
};

module.exports = {
  getAll,
  getById,
};
