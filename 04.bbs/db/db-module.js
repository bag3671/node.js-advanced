const fs = require('fs');
const mysql = require('mysql');
const crypto = require('crypto');
const express = require('express');

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
  getUserInfo: function (uid, callback) {
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
  },
  registUser: function (uid, pwd, uname, email, tel) {
    let conn = this.getConnection();
    let sql = `
    insert into users(uid, pwd, uname, email, tel) VALUE(?, ?, ?,?,?);
    `;
    let params = [uid, pwd, uname, email, tel];
    conn.query(sql, params, (error, fields) => {
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
  createBoard: function (params, callback) {
    let sql = `INSERT INTO bbs (uid,title, content)  VALUE (?,?,?); `;
    let conn = this.getConnection();
    conn.query(sql, params, (error, fields) => {
      if (error)
        console.log(error);
      callback();
    });
    conn.end();
  },
  getBbs: function (params, callback) {
    let sql = `select bid,uid,title,content,date_format(modTime, '%Y-%m-%d')AS modTime,viewCount from bbs where bid = ?
    
    `;
    let conn = this.getConnection();
    conn.query(sql, params, (error, results, fields) => {
      if (error)
        console.log(error);
      callback(results);
    });
    conn.end();
  },
  updateBbs: function (params, callback) {
    let sql = `UPDATE bbs SET title = ?, content = ? WHERE bid = ? `
    let conn = this.getConnection();
    conn.query(sql, params, (error, fields) => {
      if (error)
        console.log(error);
      callback();
    });
    conn.end();
  },
  deleteBbs: function (bid, callback) {
    let sql = `update bbs set isDeleted = 1 where bid = ?`
    let conn = this.getConnection();
    conn.query(sql, bid, (error, fields) => {
      if (error)
        console.log(error);
      callback();
    });
    conn.end();
  },
  updateUser: function (params, callback) {
    let sql = `
    update users set uname = ?, pwd = ?,tel = ?, email = ? where uid = ?
    `;
    let conn = this.getConnection();
    conn.query(sql, params, (error, fields) => {
      if (error)
        console.log(error);
      callback();
    });
    conn.end();
  },
  pagingList: function (callback) {
    let curPage = req.params.page;
    let sql = `select count(*) as cur
                from bbs
                where isDeleted = 0
                ORDER BY bid DESC
                `;
    let page_size = 10;
    let page_list_size = 10;
    let totalPagecount = 0;
    let no = '';
    let conn = getConnection();
    conn.query(sql, (error, results, fields) => {
      totalPagecount = data[0].cur;
      console.log("현재 페이지 : " + curPage, "전체 페이지 : " + totalPagecount);
      if (totalPagecount < 0) 
        totalPagecount = 0
      let totalPage = Math.ceil(totalPagecount / page_size); //전체페이지수
      let totalSet = Math.ceil(totalPagecount / page_list_size); //전체 세트 수
      let curSet = Math.ceil(curPage / page_list_size);//현재세트 번호
      let startPage = ((curSet - 1) * 10) + 1//세트내 출력될 시작 페이지
      let endPage = (startPage + page_list_size) - 1//현재 세트내 출력될 마지막 페이지

      //limit에 들어갈 첫? 구하기 
      if (curPage < 0) {
        no = 0
      } else {
        no = (curPage - 1) * 10
      }
      var result2 = {
        "curPage": curPage,
        "page_list_size": page_list_size,
        "page_size": page_size,
        "totalPage": totalPage,
        "totalSet": totalSet,
        "curSet": curSet,
        "startPage": startPage,
        "endPage": endPage
        };
      callback(result2)
    })
    conn.end()


  }
}