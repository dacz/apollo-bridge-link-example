// logAuthHeader middleware
module.exports = (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(
    req.headers.authorization
      ? `Authorization header: ${req.headers.authorization}`
      : 'no auth header'
  );
  next();
};
