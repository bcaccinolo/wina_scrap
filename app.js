const puppeteer = require('puppeteer');

puppeteer.launch({headless:true}).then(async browser => {
  const page = await browser.newPage();
  const viewPort={width:800, height:3000};
  await page.setViewport(viewPort);

  // await page.goto('https://www.winamax.fr/paris-sportifs');
  // await page.goto('https://www.winamax.fr/paris-sportifs/calendar/4');
  await page.goto('https://www.winamax.fr/paris-sportifs/calendar/12');

  // LIST
  // const section_selector = "#app-inner > div > div:nth-child(1) > span > div > div:nth-child(2) > section.event-list";
  // const list_selector = section_selector + ' > div:nth-of-type(2) > div:first-child > div:first-child > div:first-child';
  // selector = list_selector + " > div";
  // r = document.querySelectorAll(selector);
  // r.length;

  // list = await page.$(list_selector);
  // await list.screenshot({path: 'screenshot1.png'});

  // MATCHES
  // elem = await page.$(elem_selector);
  // await elem.screenshot({path: 'screenshot2.png'});

  // LINK
  // const link_selector = elem_selector + " > div:first-child > a";
  // console.log(link_selector);
  // elem = await page.$(link_selector);
  // await elem.screenshot({path: 'out.png'});

  // Wait for the page to be loaded
  section_selector = "#app-inner > div > div:nth-child(1) > span > div > div:nth-child(2) > section.event-list";
  list_selector = section_selector + ' > div:nth-of-type(2) > div:first-child > div:first-child > div:first-child';
  await page.waitForSelector(list_selector).then(() => console.log("coucou le monde"));

  match = await page.evaluate(() => {

            // Match List selector
            section_selector = "#app-inner > div > div:nth-child(1) > span > div > div:nth-child(2) > section.event-list";
            list_selector = section_selector + ' > div:nth-of-type(2) > div:first-child > div:first-child > div:first-child';

            // All Matches selector
            match_selector = list_selector + " > div";
            nodes = document.querySelectorAll(match_selector);

            res = [...nodes].map(node => {

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
