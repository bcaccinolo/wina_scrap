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
  return {
    day: ar[0],
    month: ar[1],
    year: year,
    hours: ar[2],
    minutes: ar[3]
  };
}

// Get the sport name in regard of the icon name
function setSportName(match) {
  icons_sports = {
    "sport-icon-1": "football",
    'sport-icon-2': "basketball",
    'sport-icon-1': "football",
    'sport-icon-2': "basketball",
    'sport-icon-5': "tennis",
    'sport-icon-12': "rugby union",
    'sport-icon-4': "ice hockey",
    'sport-icon-6': "handball",
    'sport-icon-23': "volleyball",
    'sport-icon-3': "baseball",
    'sport-icon-17': "cycling",
    'sport-icon-16': "american football",
    'sport-icon-34': "beach volley",
    'sport-icon-10': "boxing",
    'sport-icon-9': "golf",
    'sport-icon-112': "rugby league",
    'sport-icon-212': "rugby 7s"
  }

  if(icons_sports.hasOwnProperty(match.icon)) {
    match.sport = icons_sports[match.icon];
  } else {
    match.sport = 'undefined';
  }

  return match
}

// Concert string odds to float
function convertOdds(match) {
  odds_str = match.odds;
  odds = odds_str.map(e => parseFloat(e.replace(/,/, '.')));

  match.odd1_str = odds_str[0];
  match.odd2_str = odds_str[1];

  match.odd1 = odds[0];
  match.odd2 = odds[1];

  return match;
}

// EXAMPLE ZONE
match = {
  link: 'https://www.winamax.fr/paris-sportifs/match/15729380',
  players: 'Dijon - Le Mans',
  icon: 'sport-icon-2',
  date: '14/05 20h00',
  location: ['France', 'Jeep Elite'],
  odds: ['1,40', '2,80']
}

console.log(match);
match = splitPlayers(match);
match = parseDate(match);
match = setSportName(match)
match = convertOdds(match);
console.log(match);


DB["Match"].create({
  sport: match.sport,
  link: match.link,
  player1: match.player1,
  player2: match.player2,
  location: match.location.join(" - "),

  // Date
  dateStr: match.date,
  date: match.parsed_date,

  // Odds
  odd1: match.odd1,
  odd2: match.odd2,
  odd1Str: match.odd1_str,
  odd2Str: match.odd2_str,

  // Timestamps
  createdAt: DB.sequelize.NOW,
  updatedAt: DB.sequelize.NOW,
}, {}).then(m => {
  console.log("saved");
  console.log(m.sequelize.close().then(n => console.log("Connection closed!")))
});