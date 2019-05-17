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
  console.log(q);
  var results = await google_async(q)
  const url = results[0].link
  console.log(url);

  const browser = await puppeteer.launch({headless:true});
  const page = await browser.newPage();
  const viewPort = {width:800, height:800};
  await page.setViewport(viewPort);

  await page.goto(url);

  // Wait for the page to be loaded with the matches list content
  const selector = "div#livescoreMatch div.match-detail div.status-score"
  await page.waitForSelector(selector).then(() => console.log("Page loaded"));

  span_selector = "div#livescoreMatch div.match-detail div.status-score > span"
  const elems = await page.$$eval(span_selector, (spans) => spans.map(e => e.textContent));
  console.log(elems);

  await browser.close();
})();

