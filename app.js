const puppeteer = require('puppeteer');
const DB = require('./models/index');
const utils = require('./utils');

// const url = 'https://www.winamax.fr/paris-sportifs');
const url = 'https://www.winamax.fr/paris-sportifs/calendar/4';
// const url = 'https://www.winamax.fr/paris-sportifs/calendar/12');
// const url = 'https://www.google.fr');

// Main function
(async function() {
  // *****************************************************************=
  // Scrapping the odds
  // *****************************************************************=
  const browser = await puppeteer.launch({headless:true});
  const page = await browser.newPage();
  const viewPort = {width:800, height:3000};
  await page.setViewport(viewPort);

  // For debug reasons: console.log in the 'page.evaluate'
  page.on('console', consoleMessageObject => function (consoleMessageObject) {
    if (consoleMessageObject._type !== 'warning') {
        console.debug(consoleMessageObject._text)
    }
  });

  await page.goto(url);

  // Wait for the page to be loaded with the matches list content
  const section_selector = "#app-inner > div > div:nth-child(1) > span > div > div:nth-child(2) > section.event-list";
  const list_selector = section_selector + ' > div:nth-of-type(2) > div:first-child > div:first-child > div:first-child';
  await page.waitForSelector(list_selector).then(() => console.log("Match list loaded"));

  matches = await page.evaluate(utils.extractMatchesDataFromPage);

  await browser.close();

  console.log(matches);

  // *****************************************************************=
  // Saving all matches in the DB
  // *****************************************************************=
  matches.map(async (match) => {
    matchModel = await DB["Match"].findOne({ where: { link: match.link } });

    if (matchModel === null) {
      matchModel = await DB["Match"].create(utils.buildMatchModel(match), {});
    } else {
      await matchModel.update(utils.buildMatchModel(match), {});
    }

    await DB.sequelize.close();
    console.log("Connection closed!");
  })

})()



