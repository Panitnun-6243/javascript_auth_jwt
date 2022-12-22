const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const mysql = require('mysql2');

app.use(cors())

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'basic_authentication'
});

app.post('/register', jsonParser, function (req, res, next) {
  const email = req.body.email
  res.json({email})
})

app.listen(5000, function () {
  console.log('Web server listening on port 5000')
})