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

let sql = `INSERT INTO song(title, lyrics) VALUES (?, ?)`;
let params = ['눈누난나', '그래서 난 눈누난나 눈누누난나'];
conn.query(sql, params, (error, fields)=>{
 if (error) 
   console.log(error);
  let sql = `select * from song order by hsid desc limit 3`;
  conn.query(sql, rows, (error, fields)=>{
    if (error) {
      console.log(error);
    }
    for(let row of rows){
      console.log(row.hsid,row.title,row.lyrics);
    }
  })
});

conn.end();