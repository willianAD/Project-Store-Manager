const connection = require('./conection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const findById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [name],
  );

  return insertId;
};

const update = async (id, name) => {
  const [result] = await connection.execute(
  'UPDATE StoreManager.products SET name = (?) WHERE id = (?)',
  [name, id],
  );

  return result;
};

const remove = async (id) => {
  await connection.execute(
  'DELETE FROM StoreManager.products WHERE id = (?)',
  [id],
  );
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
};
