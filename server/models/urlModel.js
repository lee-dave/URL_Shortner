const { Pool } = require('pg')
const tokens = require('../tokens')
const pool = new Pool({ connectionString: tokens.PG_URI })

const queryString = 'CREATE TABLE IF NOT EXISTS Url (_id SERIAL PRIMARY KEY, longUrl VARCHAR NOT NULL, shortUrl VARCHAR NOT NULL, clicks int DEFAULT 0)'

pool.query(queryString, (err) => {
  if (err) console.log('Error when creating Users Table')
})


module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
};


