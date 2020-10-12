const fs = require('fs');
const mysql = require('mysql');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);

getConnection = function() {
  let conn = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port
  });
  conn.connect((error) => {
    if (error) {
      console.log('mysql connetcion erroror :' + error);
    } else {

    }
  });
  return conn;
}

let sql = `select * from song where hsid=?`;
let conn = getConnection();
conn.query(sql, 88, (error, rows, fields) => {
  if (error)
    console.log(error);
  callback(rows);
});
conn.end();

/* let sql = `delete from song where hsid = ?;`;
let conn = getConnection();
conn.query(sql, 130, (error, fields) => {
  if (error)
    console.log(error);
  callback();
});
conn.end(); */

