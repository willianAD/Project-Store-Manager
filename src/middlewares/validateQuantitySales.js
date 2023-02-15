module.exports = (req, res, next) => {
  const { body } = req;

  const validateRequired = body.some((e) => !e.quantity);

  const quantity = body.some((e) => e.quantity <= 0);

  if (quantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  if (validateRequired) return res.status(400).json({ message: '"quantity" is required' });

  return next();
};
