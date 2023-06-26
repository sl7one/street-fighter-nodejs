const responseMiddleware = (req, res) => {
  // TODO: Implement middleware that returns result of the query

  res.status(200).json({
    message: 'Sucsess',
    result: req.body,
  });
  // next();
};

export { responseMiddleware };
