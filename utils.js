const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
      res.status(401).send('Empty token. Token required.');
    } else {
      const options = { expiresIn: '2d' };
      try {
        const result = jwt.verify(token, process.env.JWT_SECRET, options);
        console.log({ result });

        req.decoded = result;
        next();
      } catch (e) {
        console.log(e.message);
        res.status(401).send('Authentication token error.');
      }
    }
  } else {
    res.status(401).send('Authentication error. Token required.');
  }
};

module.exports = validateToken;
