const DB = require('./models/index');

const express = require('express')
const app = express()
const port = 2000
const morgan = require('morgan')

app.use(morgan('combined'))

app.get('/matches', async (req, res) => {
  matches = await DB["Match"].findAll();
  values = matches.map(m => m.dataValues);

  res.json(values);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
