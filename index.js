const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");

app.set("view Engine", "ejs");
app.use("view", path.join(__dirname, "views"));
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

app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user;`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result[0]["count(*)"]);
      res.send(result);
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});
app.listen(port, () => {
  console.log("server is lestening to port 8080");
});

// connection.query(q, [data], (err, results) => {
//   if (err) {
//     console.error("Database Error:", err.message);
//     connection.end();
//     return;
//   }

//   console.log("Tables in my_app:", results);
//   console.log(results);
//   connection.end();
// });
