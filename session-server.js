const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(
  session({
    secret: 'session secrect',
    cookie: { maxAge: 60 * 1000 * 30 }
  })
);

const PORT = 3000;

app.get('/', (req, res) => {
  if (req.session.sign) {
    console.log(req.session);
    res.send(`Welcome back, ${req.session.name}`);
  } else {
    req.session.sign = true;
    req.session.name = 'pppark';
    res.send('Welcome!');
  }
});

app.listen(PORT, () => {
  console.log(`Server now listening at localhost:${PORT}`);
});
