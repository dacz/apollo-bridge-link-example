// requireAuthHeaderForPostPut middleware
module.exports = (req, res, next) =>
  ['POST', 'PUT'].includes(req.method) &&
  !(req.headers.authorization || '').match(/^Bearer\s\S+/i)
    ? res.sendStatus(401)
    : next();
