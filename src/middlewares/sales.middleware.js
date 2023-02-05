const verifySales = (req, res, next) => {
  const bod = req.body;

  const verify = bod.map((e) => {
    if (e.quantity === 0) {
      return res.status(400).json({ message: '"quantity" must be greater than or equal to 1' });
    }

    if (e.quantity < 0) {
      return res.status(400).json({ message: '"quantity" must be greater than or equal to 1' });
    }

    return e;
  });
};