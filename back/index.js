
// EXAMPLE ZONE
match = {
  link: 'https://www.winamax.fr/paris-sportifs/match/15729380XXXXXssssaaa',
  players: 'DDijon - Le Mans',
  icon: 'sport-icon-2',
  date: '14/05 20h00',
  location: ['ssssFrance', 'Jeep Elite'],
  odds: ['1,40', '2,80']
}

const utils = require('./utils');
var DB = require('./models/index');
(async () => {

  matchModel = await DB["Match"].findOne({ where: { link: match.link } });

  if (matchModel === null) {
    matchModel = await DB["Match"].create(utils.buildMatchModel(match), {});
  } else {
    await matchModel.update(utils.buildMatchModel(match), {});
  }

  await DB.sequelize.close();
  console.log("Connection closed!");
})()



