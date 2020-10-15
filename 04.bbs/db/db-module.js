const fs = require('fs');
const mysql = require('mysql');
const crypto = require('crypto');
const express = require('express');

let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);


module.exports ={
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
  createDB: function () {
    let conn = this.getConnection();
    let users = `
    create table if not exists users (
      uid varchar(20) NOT NULL primary key,
      pwd CHAR(44) not NULL,
      uname VARCHAR(20) NOT NULL,
      tel VARCHAR(20),
      email VARCHAR(40),
      regDate DATETIME default CURRENT_TIMESTAMP,
      isDeleted INT DEFAULT 0);`;
    let bbs = `
    create table if not exists bbs (
      bid int NOT NULL primary key  AUTO_INCREMENT,
      uid VARCHAR(20) NOT NULL,
      title VARCHAR(100) NOT NULL,
      content VARCHAR(1000),
      modTime DATETIME default CURRENT_TIMESTAMP,
      viewCount INT DEFAULT 0,
      isDeleted INT DEFAULT 0,
		  FOREIGN KEY (uid) REFERENCES users(uid));
     
    `;
    let dbTable = `    
      create table if not exists reply (
        rid int NOT NULL primary key AUTO_INCREMENT,
        bid int NOT NULL ,
        uid VARCHAR(20) NOT NULL ,
        content VARCHAR(100),
        regTime DATETIME default CURRENT_TIMESTAMP,
        isMine INT DEFAULT 0,
        Foreign KEY(bid) REFERENCES bbs(bid),
        Foreign KEY(uid) REFERENCES users(uid)
        );
    `;
    conn.query(dbTable,(error,fields) => {
      conn.query(bbs,(error,fields) => {
        conn.query(users,(error,fields) => {
          if (error)
            console.log(error);
          callback();
        });
        if (error)
          console.log(error);
        callback();
      });
      if (error)
        console.log(error);
      callback();
    });
    conn.end();
  },
  registUser : function (uid, pwd, uname) {
    let conn = this.getConnection();
    let sql = `
    insert into users(uid, pwd, uname) VALUE(?, ?, ?);
    `;
    let params = [uid, pwd, uname];
    conn.query(sql, params, (error, fields)=>{
      if (error)
        console.log(error);
    });
    conn.end();
  },
  getAllLists: function (callback) {
    let conn = this.getConnection();
    let sql = `select bid, title, uid, 
    DATE_FORMAT(modTime, '%Y-%m-%d') AS modTime,
    viewCount from bbs
    where isDeleted = 0
    ORDER BY bid DESC
    LIMIT 10;`;
    conn.query(sql, (error, rows, fields) => {
      if (error)
        console.log(error);
      callback(rows);
    });
    conn.end();
  },
  createBoard : function (params, callback) {
    let sql = `INSERT INTO bbs (uid,title, content)  VALUE (?,?,?); `;
    let conn = this.getConnection();
    conn.query(sql, params, (error,fields)=>{
      if (error) 
        console.log(error);
        callback();
    });
    conn.end();
  },
  getBbs : function (bid,callback) {
    let sql = `select bid,uid,title,content,date_format(modTime, '%Y-%m-%d')AS modTime,viewCount from bbs where bid = ?
    `;
    let conn = this.getConnection();
    conn.query(sql,bid,(error,results,fields)=>{
      if (error) 
        console.log(error);
      callback(results);
    });
    conn.end();
  },
  updateBbs : function (params,callback) {
    let sql = `UPDATE bbs SET title = ?, content = ? WHERE bid = ? `
    let conn = this.getConnection();
    conn.query(sql, params, (error,fields)=>{
      if (error) 
      console.log(error);
    callback();
    });
    conn.end();
  }
}