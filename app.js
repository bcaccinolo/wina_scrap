const puppeteer = require('puppeteer');

  // await page.goto('https://www.winamax.fr/paris-sportifs');
const url = 'https://www.winamax.fr/paris-sportifs/calendar/4';
  // await page.goto('https://www.winamax.fr/paris-sportifs/calendar/12');
  // await page.goto('https://www.google.fr');

puppeteer.launch({headless:true}).then(async browser => {
  const page = await browser.newPage();
  const viewPort={width:800, height:3000};
  await page.setViewport(viewPort);

  // console.log in the 'page.evaluate'
  page.on('console', consoleMessageObject => function (consoleMessageObject) {
    if (consoleMessageObject._type !== 'warning') {
        console.debug(consoleMessageObject._text)
    }
  });

  await page.goto(url);

  // LIST
  const section_selector = "#app-inner > div > div:nth-child(1) > span > div > div:nth-child(2) > section.event-list";
  const list_selector = section_selector + ' > div:nth-of-type(2) > div:first-child > div:first-child > div:first-child';
  selector = list_selector + " > div";

  // Wait for the page to be loaded
  await page.waitForSelector(list_selector).then(() => console.log("Match list loaded"));

match = await page.evaluate(async () => {

  // Match List selector
  section_selector = "#app-inner > div > div:nth-child(1) > span > div > div:nth-child(2) > section.event-list";
  list_selector = section_selector + ' > div:nth-of-type(2) > div:first-child > div:first-child > div:first-child';
  match_selector = list_selector + " > div";
  nodes = document.querySelectorAll(match_selector);

  res = [...nodes].map((node) => {
    try {
      match = {};

      // GET THE LINK
      link_selector = "div:first-child > a";
      node = node.querySelector(link_selector);
      match.link = node.href;

      // PLAYERS
      info_selector = link_selector + " > div > div:first-child";
      players_selector = info_selector + " > div:first-child"
      player_node = node.querySelector(players_selector);
      match.players = player_node.textContent;

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

      // GET THE ODDS
      buttons_selector = link_selector + " > div > div:last-child > div > div";
      button_nodes = node.querySelectorAll(buttons_selector);
      odds = [...button_nodes].map(el => el.querySelector('div > button > span').textContent);
      match.odds = odds;

      console.log(match);

      return match;
    } catch(error) {
      return "undefined";
    }
  })

  res = res.filter(e => { return e !== "undefined" });
  return res;
});

console.log(match);

await browser.close();
});
