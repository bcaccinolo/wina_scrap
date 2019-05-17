
// EXAMPLE ZONE
match = {
  link: 'https://www.winamax.fr/paris-sportifs/match/15729380',
  players: 'Dijon - Le Mans',
  icon: 'sport-icon-2',
  date: '14/05 20h00',
  location: ['France', 'Jeep Elite'],
  odds: ['1,40', '2,80']
}

const utils = require('./utils');
var DB = require('./models/index');
(async () => {
  matchModel = await DB["Match"].create(utils.buildMatchModel(match), {});
  await matchModel.sequelize.close();
  console.log("Connection closed!");
})()