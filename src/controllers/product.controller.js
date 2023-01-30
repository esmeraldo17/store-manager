const { productService } = require('../services');

const getAll = async (_req, res) => {
  const products = await productService.getAll();
  res.status(200).json(products.message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getById(id);

  if (type) return res.status(404).json({ message });
  res.status(200).json(message);
};

module.exports = {
  getAll,
  getById,
};
