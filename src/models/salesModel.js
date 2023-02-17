const connection = require('./conection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId,
    sp.quantity FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id`,
  );
  return result;
};

const findById = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.product_id AS productId, sp.quantity FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id WHERE id = ?`,
    [id],
  );
  return result;
};

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUE ()',
  );

  return insertId;
};

const insert = async (saleId, productId, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return result;
};

const remove = async (id) => {
  await connection.execute(
  'DELETE FROM StoreManager.sales WHERE id = (?)',
  [id],
  );
};

const update = async (saleId, productId, quantity) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.sales_products SET quantity = (?)
    WHERE product_id = (?) AND sale_id = (?)`,
    [quantity, productId, saleId],
  );

  return result;
};

module.exports = {
  findAll,
  findById,
  insertSales,
  insert,
  remove,
  update,
};
