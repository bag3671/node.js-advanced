const fs = require('fs');
const mysql = require('mysql');
const crypto = require('crypto');

let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);

module.exports = {
  getConnection: function () {
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
  },
  getAllLists: function (callback) {
    let conn = this.getConnection();
    let sql = `select uid, uname, DATE_FORMAT(regDate, '%Y-%m-%d %T') AS regDate , isdeleted from users 
              WHERE isDeleted = 0 
              order by regDate 
              limit 10;`;
    conn.query(sql, (error, rows, fields) => {
      if (error)
        console.log(error);
      callback(rows);
    });
    conn.end();
  },
  
  ganerateHash: function (somthing) {
    let shasum = crypto.createHash('sha256');  
    shasum.update(somthing);
    return shasum.digest('base64') ; 
  },
  
  getUserInfo:  function (uid, callback) {
    let conn = this.getConnection();
    let sql = `select * from users where uid like ?`;
    conn.query(sql, uid, (error, results, fields) => {
      if (error)
        console.log(error);
      callback(results[0]);
    });
    conn.end();
  },
  deleteUser : function (uid, callback) {
    let conn = this.getConnection();
    let sql = `update users set isDeleted=1 where uid like ?;`;
    conn.query(sql, uid, (error, fields) => {
      if (error)
        console.log(error);
      callback();
    });
    conn.end();
  },
  updateUser : function (params, callback) {
    let conn = this.getConnection();
    let sql = `update users set pwd=? where uid like ?;`;
    conn.query(sql, params, (error, fields) => {
      if (error)
        console.log(error);
      callback();
    });
    conn.end();
  }
}