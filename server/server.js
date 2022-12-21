const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/users', function (req, res, next) {
  res.json({msg: 'Test running server'})
})

app.listen(5000, function () {
  console.log('Web server listening on port 5000')
})