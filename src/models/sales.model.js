const connection = require('./connection');

const insertToSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES(NOW())',
  );

  return insertId; 
};

const getProductById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return product;
};

const insertToSalesProduts = async (body) => {
  const getPId = await Promise.all(body.map(async (e) => {
    const result = await getProductById(e.productId);
    if (!result) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    return result;
  }));

  const PResult = getPId.find((e) => e.type);

  if (PResult) return getPId;
  
  const saleId = await insertToSales() - 1;
  const sales = await Promise.all(body.map(async (e) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
      [saleId, e.productId, e.quantity],
    );

    return e;
  }));
  
  return { id: saleId, itemsSold: sales };
};

module.exports = {
  insertToSalesProduts,
  getProductById,
};