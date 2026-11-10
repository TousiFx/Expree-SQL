const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let port = 8080;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "my_app",
  password: "Nomansky#2002",
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

//HOME Route
app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user;`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let countValue = result[0]["count(*)"];
      res.render("home.ejs", { countValue });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

//USER ROUTE
app.get("/user", (req, res) => {
  let q = `SELECT * FROM user`;
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      res.render("showuser", { users });
    });
  } catch (err) {
    console.log(err);
    res.render("Some error in DB");
  }
});

//USER EDIT
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = "SELECT * FROM user WHERE id = ?";
  try {
    connection.query(q, [id], (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

//USER UPDATE ROUTE
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formPass, username: newUsername } = req.body;
  let q = "SELECT * FROM user WHERE id = ?";
  try {
    connection.query(q, [id], (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (formPass != user.password) {
        return res.send("wrong password");
      } else {
        let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          return res.redirect("/user");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

app.listen(port, () => {
  console.log("server is lestening to port 8080");
});
