module.exports = {

  // Add keys 'player1' and 'player2'
  // in the Match object
  // The 'players' key is kept in case of!
  splitPlayers: function (match) {
    players = match.players.split(" - ");
    match.player1 = players[0];
    match.player2 = players[1];
    return match;
  },

  // Parse the date field & generate a real Date format
  // Date is UTC+2 French timezone
  parseDate: function (match) {
    date_obj = this.extractDateInfo(match.date);
    date_str = `${date_obj.month}/${date_obj.day}/${date_obj.year} ${date_obj.hours}:${date_obj.minutes}:00 UTC+2`;
    match.parsed_date = new Date(date_str);
    return match;
  },

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
  extractDateInfo: function (date_str) {
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
  },

  // Get the sport name in regard of the icon name
  setSportName: function (match) {
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
  },

  // Concert string odds to float
  convertOdds: function (match) {
    odds_str = match.odds;
    odds = odds_str.map(e => parseFloat(e.replace(/,/, '.')));

    match.odd1_str = odds_str[0];
    match.odd2_str = odds_str[1];

    match.odd1 = odds[0];
    match.odd2 = odds[1];

    return match;
  },

  buildMatchModel: function(match) {
    match = this.convertOdds(
            this.setSportName(
            this.parseDate(
            this.splitPlayers(match))));

    return {
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
    }
  },

  extractMatchesDataFromPage: async function () {

    // Match List selector
    section_selector = "#app-inner > div > div:nth-child(1) > span > div > div:nth-child(2) > section.event-list";
    list_selector = section_selector + ' > div:nth-of-type(2) > div:first-child > div:first-child > div:first-child';
    match_selector = list_selector + " > div";
    nodes = document.querySelectorAll(match_selector);

    function extractOneMatchData(node) {
      try {
        match = {};

        // GET THE LINK
        link_selector = "div:first-child > a";
        node = node.querySelector(link_selector);
        match.link = node.href;

        // PLAYERS
        info_selector = link_selector + " > div > div:first-child";
        players_selector = info_selector + " > div:first-child";
        player_node = node.querySelector(players_selector);
        match.players = player_node.textContent;

        // ICON
        icon_selector = players_selector + " > svg";
        icon_node = node.querySelector(icon_selector);
        match.icon = icon_node.classList[1]

        // DATE
        date_loc_selector = info_selector + " > div:last-child";
        date_selector = date_loc_selector + " > span:first-child";
        date_node = node.querySelector(date_selector);
        match.date = date_node.textContent;

        // LOCATION & TOURNAMENT
        date_loc_selector = info_selector + " > div:last-child > span";
        span_nodes = node.querySelectorAll(date_loc_selector);
        nodes_ar = [...span_nodes];
        nodes_ar.shift();
        match.location = nodes_ar.map(node => node.textContent);

        // ODDS
        buttons_selector = link_selector + " > div > div:last-child > div > div";
        button_nodes = node.querySelectorAll(buttons_selector);
        odds = [...button_nodes].map(el => el.querySelector('div > button > span').textContent);
        match.odds = odds;

        return match;
      } catch (error) {
        return "undefined";
      }
    }
    res = [...nodes].map(extractOneMatchData)
      .filter(e => {
        return e !== "undefined"
      });
    return res;
  }
}
