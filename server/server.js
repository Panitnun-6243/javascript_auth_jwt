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
  connection.execute(
    "INSERT INTO `users`(`email`, `password`, `fname`, `lname`) VALUES (?,?,?,?)",
    [req.body.email, req.body.password, req.body.fname, req.body.lname],
    function (err, results) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok" });
    }
  );
});

//start server at port 5000_
app.listen(5000, function () {
  console.log("Web server listening on port 5000");
});
