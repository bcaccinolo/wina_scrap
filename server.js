const DB = require('./models/index');

const express = require('express')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
    matches = await DB["Match"].findAll();
    await DB.sequelize.close();
    values = matches.map(m => m.dataValues);

    res.json(values);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))