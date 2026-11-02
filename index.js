const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "my_app",
  password: "Nomansky#2002",
});

connection.query("SHOW TABLES", (err, results) => {
  if (err) {
    console.error("Database Error:", err.message);
    connection.end();
    return;
  }

  console.log("Tables in my_app:", results);
  console.log(results[0]);
  console.log(results[1]);
  connection.end();
});

// let getRandomUser = () => {
//   return {
//     id: faker.string.uuid(),
//     username: faker.internet.username(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//   };
// };

// console.log(getRandomUser());
