const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.get('/', (req, res) => res.send('Hello Express!'));

app.post('/login', (req, res) => {
  const { name, password } = req.body;

  if (name !== 'park' || password !== '1234') {
    res.status(401).send('Authentication error');
  } else {
    // create a token
    const payload = { user: name };
    const options = { expiresIn: '2d' };
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, options);
    res.send({ token });
  }
});

app.post('/logout', (req, res) => {
  console.log('logout');
  res.send('logout');
});

app.listen(PORT, () => {
  console.log(`Server now listening at localhost:${PORT}`);
});
