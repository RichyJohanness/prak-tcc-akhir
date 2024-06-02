const mysql = require("mysql2");

const config = {
  host: "34.123.85.96",
  user: "root",
  password: "2+^'U]0_Pp#<{O>a",
  database: "perpustakaan",
};

const connect = mysql.createConnection(config);

connect.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

module.exports = connect;
