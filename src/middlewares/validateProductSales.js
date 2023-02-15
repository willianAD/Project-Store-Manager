module.exports = (req, res, next) => {
  const { body } = req;

  const productRequired = body.some((e) => !e.productId);

  if (productRequired) return res.status(400).json({ message: '"productId" is required' });

  return next();
};
