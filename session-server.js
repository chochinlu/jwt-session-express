const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

// TODO: DB: stores
const users = [{ id: 1, name: 'park', password: '1234' }];

const TWO_HOURS = 1000 * 60 * 60 * 2;

const app = express();
app.use(bodyParser.json());

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: 'session secrect',
    cookie: {
      maxAge: TWO_HOURS,
      sameSite: true
    }
  })
);

const PORT = 3000;

const checkAuth = (req, res, next) => {
  // console.log(req.session);
  if (!req.session.userId) {
    res.status(401).send('Auth fail. Please login!!');
  } else {
    next();
  }
};

app.get('/', checkAuth, (req, res) => {
  const user = users.find(user => user.id === req.session.userId);
  res.send(`Hello ${user.name}`);
});

app.post('/login', (req, res) => {
  const { name, password } = req.body;
  const user = users.find(
    user => user.name === name && user.password === password
  );

  if (user) {
    req.session.userId = user.id;
    res.send(`logged in! ${user.id}`);
  } else {
    res.status(401).send('Authentication error');
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).send('logout failed.');
    } else {
      res.clearCookie('sid');
      res.send('See you.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server now listening at localhost:${PORT}`);
});
