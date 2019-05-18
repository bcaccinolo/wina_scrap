const puppeteer = require('puppeteer');
const google = require('google');

const utils = require('./utils');

// Basket - matchendirect.com
// const player1 = "Chorale Roanne",
//       player2 = "Vichy Clermont",
//       sport = "basket",
//       source = 'matchendirect',
//       month = 'mai',
//       year = '2019'

// Tennis - sportytrader.com
const player1 = "Stefanos Tsitsipas",
      player2 = "Jannik Sinner",
      sport = "tennis",
      source = 'sportytrader',
      extra = '05/2019'

const q = `${player1} ${player2} ${sport} ${source} ${extra}`

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
  console.log(q);
  var results = await google_async(q)
  const url = results[0].link
  console.log(url);

  const browser = await puppeteer.launch({headless:true});
  const page = await browser.newPage();
  const viewPort = {width:800, height:800};
  await page.setViewport(viewPort);

  await page.goto(url);
  await page.screenshot({path: 'screenshot.png'});

  // **************************************************************************
  // sportytrader.com
  // **************************************************************************

  // Wait for the page to be loaded with the matches list content
  const selector = "#header-sporting-event-tennis"
  await page.waitForSelector(selector).then(() => console.log("Page loaded"));

  score_selector = "#header-sporting-event-tennis > div.header-match-timer > div > div.score"
  const content = await page.$eval(score_selector, (div) => div.textContent);
  console.log(content);

  await browser.close();
})();

