const mysql = require('mysql');
const fs = require('fs');
const di = require('./db-module')
let info = fs.readFileSync('./mysql.json', 'utf8');
let connInfo = JSON.parse(info);
let conn = mysql.createConnection({
  host: connInfo.host,
  user: connInfo.user,
  password: connInfo.password,
  database: connInfo.database,
  port: connInfo.port
});

di.createDB(callback);
