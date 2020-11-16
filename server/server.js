const express = require('express')
const app = express();
const path = require("path");
const PORT = 3000;
const urlController = require('./controllers/urlController')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("../build"));

app.get('/',
  (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
  })

app.get('/getAll',
  urlController.getAllUrl,
  (req, res) => {
    res.status(200).json(res.locals)
  })

app.post('/longUrls',
  urlController.postUrl,
  (req, res) => {
    res.redirect('/')
  })

app.get('/:shortUrl',
  urlController.checkShortUrl,
  urlController.addClick,
  (req, res) => {
    const longUrl = res.locals.longurl
    res.redirect(`${longUrl}`)
  })

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});