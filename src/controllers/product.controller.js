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

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.createProduct(name);

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (type) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  res.status(201).json(message);
};

module.exports = {
  getAll,
  getById,
  createProduct,
};
