const fs = require('fs');
const mysql = require('mysql');
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
  getAllLists : function (callback) {
    let conn = this.getConnection();
    let sql = `
    SELECT ggid, name, date_format(debut, '%Y-%m-%d')as debutday from girl_group ORDER BY hit_song_id limit 5;
    `;
    conn.query(sql, (error, rows, fields)=>{
      if (error) 
        console.log(error);
      callback(rows);
    });
    conn.end();
  },
  insertGirlGroup : function (params, callback) {
    let sql = `INSERT INTO girl_group (NAME, debut)  VALUE (?,?); `;
    let conn = this.getConnection();
    conn.query(sql, params, (error,fields)=>{
      if (error) 
        console.log(error);
        callback();
    });
    conn.end();
  },
  deleteGirlGroup : function (ggid, callback) {
    let sql = `delete from girl_group where ggid = ?;`;
    let conn = this.getConnection();
    conn.query(sql, ggid, (error, fields)=>{
      if (error) 
        console.log(error);
      callback();
    });
    conn.end();
  },
  getGirlGroup : function (ggid, callback) {
    let sql = `SELECT ggid, name, date_format(debut, '%Y-%m-%d')as debutday from girl_group where ggid = ?;`;
    let conn = this.getConnection();
    conn.query(sql, ggid, (error,rows,fields)=>{
      if (error) 
        console.log(error);
      callback(rows[0]);
    })
    conn.end();
  },
  updateGirlGroup : function (params, callback) {
    let sql = `update girl_group set name =?,debut=? where ggid=?;`;
    let conn = this.getConnection();
    conn.query(sql, params, (error, fields)=>{
      if (error) 
        console.log(error);
      callback();
    });
    conn.end();
  }
}