module.exports = {

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
