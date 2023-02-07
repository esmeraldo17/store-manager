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

const updateProduct = async (id, name) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  const [{ insertId }] = await connection.execute(query, [name, id]);
  return insertId;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?';
  const [{ affectedRows }] = await connection.execute(query, [id]);

  return affectedRows;
};

const getByName = async (wantedName) => {
  const products = await getAll();
  return products.filter(({ name }) =>
    name.toLowerCase().includes(wantedName.toLowerCase()));
};

module.exports = {
  getAll,
  getById,
  insert,
  updateProduct,
  deleteProduct,
  getByName,
};