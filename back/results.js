const puppeteer = require('puppeteer');
const google = require('google');

const utils = require('./utils');

const player1 = "Chorale Roanne",
      player2 = "Vichy Clermont",
      sport = "basket",
      source = 'matchendirect',
      month = 'mai',
      year = '2019'

const q = `${player1} ${player2} ${sport} ${source} ${month} ${year}`

// encapsulating google call
let google_async = (query) => {
  return new Promise(
    (resolve, reject) => {
      google(query, function (err, res){
        if (err) reject(error);
        resolve(res.links);
      })
    }
  )
}

(async () => {
  var results = await google_async(q)
  const url = results[0].link
  console.log(url);

  const browser = await puppeteer.launch({headless:true});
  const page = await browser.newPage();
  const viewPort = {width:800, height:800};
  await page.setViewport(viewPort);

  await page.goto(url);

  await page.screenshot({path: 'screenshot.png'});

  await browser.close();
})();

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
        console.log(consoleMessageObject._text)
    }

  });
  await page.goto(url);

  // Wait for the page to be loaded with the matches list content
  const section_selector = "#app-inner > div > div:nth-child(1) > span > div > div:nth-child(2) > section.event-list";
  const list_selector = section_selector + ' > div:nth-of-type(2) > div:first-child > div:first-child > div:first-child';
  await page.waitForSelector(list_selector).then(() => console.log("Match list loaded"));

  const matches = await page.evaluate(utils.extractMatchesDataFromPage);

  await browser.close();

  console.log(matches);

}) // ()



