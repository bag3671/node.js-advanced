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
/* createDB: function () {
  let conn = this.getConnection();
  let users = `
  create table if not exists users (
    uid varchar(20) NOT NULL primary key,
    pwd CHAR(44) not NULL,
    uname VARCHAR(20) NOT NULL,
    tel VARCHAR(20),
    email VARCHAR(40),
    regDate DATETIME default CURRENT_TIMESTAMP,
    isDeleted INT DEFAULT 0,
    photo varchar(20));`;
  let bbs = `
  create table if not exists bbs (
    bid int NOT NULL primary key  AUTO_INCREMENT,
    uid VARCHAR(20) NOT NULL,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(1000),
    modTime DATETIME default CURRENT_TIMESTAMP,
    viewCount INT DEFAULT 0,
    isDeleted INT DEFAULT 0,
    replyCount varchar(2) default 0,
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
  conn.query(dbTable, (error, fields) => {
    conn.query(bbs, (error, fields) => {
      conn.query(users, (error, fields) => {
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
}, */