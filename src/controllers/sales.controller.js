const { salesService } = require('../services');

const errorMessage1 = '"quantity" must be greater than or equal to 1';
const errorMessage2 = '"quantity" is required';
const errorMessage3 = '"productId" is required';
const errorMessage4 = 'Product not found';

const createSales1 = async (req, res, next) => {
  const bod = req.body;
  const { type, message } = await salesService.createSales(bod);
  if (type && message === errorMessage3) return res.status(400).json({ message });
  if (type && message === errorMessage2) return res.status(400).json({ message });

  next();
};

const createSales2 = async (req, res) => {
  const bod = req.body;
  const { type, message } = await salesService.createSales(bod);
  if (type && message === errorMessage1) return res.status(422).json({ message });

  let result = {};
  const arr = Array.isArray(message);
  if (arr === true) {
    result = message.find((e) => e.message === errorMessage4);
  }
 
  if (result.type) return res.status(404).json({ message: result.message });

  res.status(201).json(message);
};

module.exports = {
  createSales1,
  createSales2,
};