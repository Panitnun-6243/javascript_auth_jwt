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
//jwt
const jwt = require("jsonwebtoken");
const jwtkey = "nongtan_soodlour";

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

//login
app.post("/login", jsonParser, function (req, res) {
  connection.execute(
    "SELECT * FROM `users` WHERE email = ?",
    [req.body.email],
    function (err, users, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      // check if email is in db or not
      if (users.length == 0) {
        res.json({ status: "error", message: "invalid email" });
        return;
      }
      //check password by compare pw from request with pw in db
      bcrypt.compare(
        req.body.password,
        users[0].password,
        function (err, result) {
          //if result = true; it means the password is corrected, then login
          if (result) {
            //generate token
            const token = jwt.sign({ email: users[0].email }, jwtkey, {
              expiresIn: "1h",
            });
            res.json({ status: "ok", message: "login success", token });
          } else {
            res.json({ status: "error", message: "login failed" });
          }
        }
      );
    }
  );
});

//verify token
app.post("/auth", jsonParser, function (req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, jwtkey);
    res.json({ status: "ok", decoded });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

//start server at port 5000
app.listen(5000, function () {
  console.log("Web server listening on port 5000");
});
