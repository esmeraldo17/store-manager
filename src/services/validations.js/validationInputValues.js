const { addProductSchema, addSalesSchema } = require('./schemas');

const validateNewProduct = (name) => {
  const { error } = addProductSchema
    .validate({ name });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateSalesInput = (body) => {
  let erro = '';
  body.map((e) => {
    const { error } = addSalesSchema
      .validate(e);
    if (error) erro = error;
    return e;
  });
  if (erro) return { type: 'INVALID_VALUE', message: erro.message };
  // if (erro.type === 'any.required') return { type: 'INVALID_VALUE', message: erro.message };
  // if (erro.type === 'number.min') return { type: 'MIN_VALUE', message: erro.message };
  return { type: null, message: '' };
};

module.exports = {
  validateNewProduct,
  validateSalesInput,
};