const puppeteer = require('puppeteer');

// const selector = "#app-inner > div > div:nth-child(1) > span > div > div:nth-child(2) > section " +
//                  "> div:nth-child(2) > div";

const section_selector = "#app-inner > div > div:nth-child(1) > span > div > div:nth-child(2) > section";

puppeteer.launch({headless:true}).then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://www.winamax.fr/paris-sportifs');

  // SECTION
  const section_selector = "#app-inner > div > div:nth-child(1) > span > div > div:nth-child(2) > section.event-list";
  // section = await page.$(section_selector);
  // await section.screenshot({path: 'screenshot0.png'});

  // LIST
  const list_selector = section_selector + ' > div:nth-of-type(2) > div:first-child > div:first-child > div:first-child';
  // list = await page.$(list_selector);
  // await list.screenshot({path: 'screenshot1.png'});

  // ELEMENT
  const elem_selector = list_selector + " > div:nth-of-type(8)";
  // elem = await page.$(elem_selector);
  // await elem.screenshot({path: 'screenshot2.png'});

  // LINK
  const link_selector = elem_selector + " > div:first-child > a";
  // console.log(link_selector);
  // elem = await page.$(link_selector);
  // await elem.screenshot({path: 'out.png'});


  match = await page.evaluate(() => {
            match = {};

            // Match block selector
            section_selector = "#app-inner > div > div:nth-child(1) > span > div > div:nth-child(2) > section.event-list";
            list_selector = section_selector + ' > div:nth-of-type(2) > div:first-child > div:first-child > div:first-child';
            elem_selector = list_selector + " > div:nth-of-type(8)";

            // GET THE LINK
            link_selector = elem_selector + " > div:first-child > a";
            node = document.querySelector(link_selector);
            match.link = node.href;

            // PLAYERS
            info_selector = link_selector + " > div > div:first-child";
            players_selector = info_selector + " > div:first-child"
            node = document.querySelector(players_selector);
            match.players = node.textContent;

            // DATE
            date_loc_selector = info_selector + " > div:last-child";
            date_selector = date_loc_selector + " > span:first-child";
            node = document.querySelector(date_selector);
            match.date = node.textContent;

            // LOCATION & TOURNAMENT
            date_loc_selector = info_selector + " > div:last-child > span";
            nodes = document.querySelectorAll(date_loc_selector);
            nodes_ar = [...nodes];
            nodes_ar.shift();
            match.location = nodes_ar.map(node => node.textContent);

            // GET THE ODDS
            buttons_selector = link_selector + " > div > div:last-child > div > div";
            nodes = document.querySelectorAll(buttons_selector);
            odds = [...nodes].map(el => el.querySelector('div > button > span').textContent);
            match.odds = odds;

            return match;
  });
  console.log(match);

  await browser.close();
});
