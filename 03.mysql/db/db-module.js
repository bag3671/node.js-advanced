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
  getAllLists: function (callback) {
    let conn = this.getConnection();
    let sql = `select * from song order by hsid desc limit 10;`;
    conn.query(sql, (error, rows, fields) => {
      if (error)
        console.log(error);
      callback(rows);
    });
    conn.end();
  },
  insertSong: function (params, callback) {
    let sql = `INSERT INTO song(title, lyrics) VALUES (?, ?)`;
    let conn = this.getConnection();
    conn.query(sql, params, (error, fields) => {
      if (error)
        console.log(error);
      callback();
    });
    conn.end();
  },
  deleteSong: function (hsid, callback) {
    let sql = `delete from song where hsid = ?;`;
    let conn = this.getConnection();
    conn.query(sql, hsid, (error, fields) => {
      if (error)
        console.log(error);
      callback();
    });
    conn.end();
  },
  getSong:function (hsid, callback) {
    let sql = `select * from song where hsid=?`;
    let conn = this.getConnection();
    conn.query(sql, hsid, (error, rows, fields) => {
      if (error)
        console.log(error);
      callback(rows[0]); //주의!!!!
    });
    conn.end();
  },
  updateSong: function (params, callback) {
    let sql = `update song set title =?,lyrics=? where hsid=?;`;
    let conn = this.getConnection();
    conn.query(sql, params, (error, fields) => {
      if (error)
        console.log(error);
      callback();
    });
    conn.end();
  },
  getJoinLists: function (callback) {
    let conn = this.getConnection();
    let sql = `SELECT song.hsid, song.title, gg.name, song.lyrics FROM song
    JOIN girl_group AS gg
    ON song.hsid = gg.hit_song_id
    ORDER BY song.hsid DESC
    LIMIT 10;
    `;
    conn.query(sql, (error, rows, fields) => {
      if (error)
        console.log(error);
      callback(rows);
    });
    conn.end();
  }
}