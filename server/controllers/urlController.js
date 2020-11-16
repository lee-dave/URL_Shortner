const urlModel = require('../models/urlModel')
const urlController = {}
const shortid = require('shortid')

urlController.postUrl = (req, res, next) => {
  const { longUrls } = req.body
  const shortUrl = shortid.generate()
  const urlArr = [longUrls, shortUrl]
  const queryString = 'INSERT INTO Url (longUrl, shortUrl) VALUES ($1, $2)'
  urlModel.query(queryString, urlArr, (err, res) => {
    if (err) console.log('Error in the postUrl controller', err)
    else {
      return next()
    }
  })
}

urlController.checkShortUrl = (req, res, next) => {
  const shortUrl = req.params.shortUrl
  const urlArr = [shortUrl]
  const queryString = 'SELECT * FROM Url WHERE shortUrl=$1'
  urlModel.query(queryString, urlArr, (err, response) => {
    if (err) console.log('Error in the checkShortUrl controller', err)
    else if (response.rows.length > 0) {
      res.locals.longurl = response.rows[0].longurl;
      res.locals.clicks = response.rows[0].clicks;
      return next()
    }
    else {
      return next(new Error("No Short Url"))
    }
  })
}

urlController.addClick = (req, res, next) => {
  const longUrl = res.locals.longurl
  const clicks = res.locals.clicks + 1
  const urlArr = [clicks, longUrl]
  const queryString = 'UPDATE Url SET clicks=$1 WHERE longurl=$2'
  urlModel.query(queryString, urlArr, (err, response) => {
    if (err) console.log('Error in the addClick controller', err)
    else {
      return next()
    }
  })
}

urlController.getAllUrl = (req, res, next) => {
  const queryString = 'SELECT * FROM "public"."url" LIMIT 100'
  urlModel.query(queryString, (err, response) => {
    if (err) console.log('Error in the addClick controller', err)
    else {
      res.locals.allUrls = response.rows
      return next()
    }
  })
}

module.exports = urlController;
