const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

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

let q = "INSERT INTO user (id,username,email,password) VALUES ?";
let data = [];
for (let i = 1; i <= 100; i++) {
  data.push(getRandomUser());
}

connection.query(q, [data], (err, results) => {
  if (err) {
    console.error("Database Error:", err.message);
    connection.end();
    return;
  }

  console.log("Tables in my_app:", results);
  console.log(results);
  connection.end();
});
