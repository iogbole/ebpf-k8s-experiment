const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  console.log('Received request from Sender');
  res.send('Hello from Receiver!');
});

app.listen(port, () => {
  console.log(`Receiver listening at http://localhost:${port}`);
});
