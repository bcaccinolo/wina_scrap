
## Launch with

`node app.js`

## Todo

- ✅get info for one match
- ✅iterate on the list of match - just get the interesting ones
- ✅get the icon index to get the sport name
- ✅can save existing data in beta mode
- ✅extract players & parse date
- ✅save player one and player two
- ✅save the date
- ✅get the sport name in regard of the icon
- ✅add odds in the match table (in float and in string to keep the raw data)
- ✅Structuring a little bit of code
- ✅scrap and insert
- ✅update if existing

- do not insert match with 3 odds

- has_many :odds (to get the history)

- connect do the scrapper


## note
https://github.com/GoogleChrome/puppeteer

## PostgreSQL running
## Docker DB
docker run --name pg.js \
-e POSTGRES_DB=winascrap \
-e POSTGRES_USER=winascrap \
-e POSTGRES_PASSWORD=winascrap \
-e DNSDOCK_ALIAS=winascrap.db.docker \
postgres






