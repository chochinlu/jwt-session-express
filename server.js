const express = require('express');

const app = express();

const PORT = 3000;

app.use((req, res, next) => {
  console.log(`Time: ${Date.now()}`);
});

app.get('/', (req, res) => res.send('Hello Express'));

app.listen(PORT, () => {
  console.log(`Server now listening at localhost:${PORT}`);
});
