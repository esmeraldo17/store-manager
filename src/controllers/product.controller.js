const productService = require('../services');

const getAll = async (_req, res) => {
  const products = productService.getAll();
  res.status(200).json(products.message);
};

const getById = (req, res) => {
  const { id } = req.params;
};

module.exports = {
  getAll,
  getById,
};
