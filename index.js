var DB = require('./models/index');

// Add keys 'player1' and 'player2'
// in the Match object
// The 'players' key is kept in case of!
function splitPlayers(match) {
  players = match.players.split(" - ");
  match.player1 = players[0];
  match.player2 = players[1];
  return match;
}

// Parse the date field & generate a real Date format
// Date is UTC+2 French timezone
function parseDate(match) {
  date_obj = extractDateInfo(match.date);
  date_str = `${date_obj.month}/${date_obj.day}/${date_obj.year} ${date_obj.hours}:${date_obj.minutes}:00 UTC+2`;
  match.parsed_date = new Date(date_str);
  return match;
}

/* From the string "25/11 15:00" will return
 the object:
    {
      day: 25,
      month: 11,
      year: 2019,
      hours: 15,
      minutes: 0
    }
 */
function extractDateInfo(date_str) {
  date_ar = date_str.split(' ');
  date1_ar = date_ar[0].split('/');
  date2_ar = date_ar[1].split('h');
  ar = date1_ar.concat(date2_ar);
  ar = ar.map(e => Number.parseInt(e))
  year = new Date(Date.now()).getFullYear();
  return {day: ar[0], month: ar[1], year: year, hours: ar[2], minutes: ar[3]};
}

match = {
  link: 'https://www.winamax.fr/paris-sportifs/match/15729380',
  players: 'Dijon - Le Mans',
  icon: 'sport-icon-2',
  date: '14/05 20h00',
  location: [ 'France', 'Jeep Elite' ],
  odds: [ '1,40', '2,80' ]
}

console.log(match);
match = splitPlayers(match);
match = parseDate(match);
console.log(match);


DB["Match"].create({
  link: match.link,
  player1: match.player1,
  player2: match.player2,
  date: match.date,
  parsedDate: match.parsed_date,
  location: match.location.join(" - "),
  // Timestamps
  createdAt: DB.sequelize.NOW,
  updatedAt: DB.sequelize.NOW,
}, {}).then(m => {
                    console.log("saved");
                    console.log(m.sequelize.close().then(n => console.log("Connection closed!")))
                });
