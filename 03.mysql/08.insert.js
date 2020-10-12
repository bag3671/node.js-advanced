const mysql = require('mysql');
const fs = require('fs');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);
let conn = mysql.createConnection({
  host : config.host,
  user : config.user,
  password : config.password,
  database : config.database,
  port : config.port
});

conn.connect();

let sql = `INSERT INTO song(title, lyrics) VALUES ('Dynamite', 'Cos ah ah I’m in the stars tonight
So watch me bring the fire and set the night alight')`
conn.query(sql, (error, fields)=>{
 if (error) {
   console.log(error);
}});

conn.end();