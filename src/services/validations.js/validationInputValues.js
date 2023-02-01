const { addProductSchema } = require('./schemas');

const validateNewProduct = (name) => {
  const { error } = addProductSchema
    .validate({ name });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateNewProduct,
};