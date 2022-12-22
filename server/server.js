//app
const express = require("express");
const cors = require("cors");
const app = express();
//json body usage
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
//db
const mysql = require("mysql2");
//password hash
const bcrypt = require("bcrypt");
const saltRounds = 10;

//middleware
app.use(cors());

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "basic_authentication",
});

//register
app.post("/register", jsonParser, function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    connection.execute(
      "INSERT INTO `users`(`email`, `password`, `fname`, `lname`) VALUES (?,?,?,?)",
      [req.body.email, hash, req.body.fname, req.body.lname],
      function (err, results) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        res.json({ status: "ok" });
      }
    );
  });
});

//start server at port 5000
app.listen(5000, function () {
  console.log("Web server listening on port 5000");
});
