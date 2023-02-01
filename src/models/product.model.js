const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [product] = await connection.execute(query);

  return product;
};

const getById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return product;
};

const insert = async (product) => {
  const query = 'INSERT INTO StoreManager.products(name) VALUES(?)';
  const [{ insertId }] = await connection.execute(query, [product]);

  return insertId;
};

module.exports = {
  getAll,
  getById,
  insert,
};