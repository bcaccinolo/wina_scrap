const DB = require('./models/index');

const express = require('express')
const app = express()
const port = 2000
const morgan = require('morgan')

app.use(morgan('combined'))

app.get('/matches', async (req, res) => {

  const Op = DB.Sequelize.Op;

  matches = await DB["Match"].findAll(
    {
      where: {
        date: { [Op.gt]: new Date() }
      },
      order: [ ['dateStr', 'ASC'] ]
    }
  );
  values = matches.map(m => m.dataValues);

  res.json(values);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// (async () => {

//   const Op = DB.Sequelize.Op;

//   matches = await DB["Match"].count(
//     {
//       where: {
//         date: { [Op.gt]: new Date() }
//       },
//       order: [ ['dateStr', 'ASC'] ]
//     }
//   );

//   console.log(matches);
//   console.log(DB.Sequelize.Op);

//   await DB.sequelize.close();


// })()
