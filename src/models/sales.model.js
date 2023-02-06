const connection = require('./connection');

const insertToSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES(NOW())',
  );
  console.log(insertId);
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

const getAll = async () => {
  const query = `SELECT sales.date as date, spr.sale_id as saleId, spr.product_id as productId,
  spr.quantity as quantity
  FROM StoreManager.sales AS sales
  INNER JOIN sales_products AS spr ON sales.id = spr.sale_id`;
  const [sales] = await connection.execute(query);

  return sales;
};

const getById = async (id) => {
  const query = `SELECT sales.date as date, spr.sale_id as saleId, spr.product_id as productId,
  spr.quantity as quantity
  FROM StoreManager.sales AS sales
  INNER JOIN sales_products AS spr ON sales.id = spr.sale_id
  HAVING sale_id = ?`;
  const [sales] = await connection.execute(query, [id]);
  const result = sales.map(({ productId, date, quantity }) => ({
    date,
    productId,
    quantity,
  }));
  return result;
};

module.exports = {
  insertToSalesProduts,
  getProductById,
  getAll,
  getById,
};