const mysql = require('mysql');
const fs = require('fs');
const crypto = require('crypto');

let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);
let conn = mysql.createConnection({
  host : config.host,
  user : config.user,
  password : config.password,
  database : config.database,
  port : config.port
});

function ganerateHash(somthing) {
  let shasum = crypto.createHash('sha256');  //sha256, sha512
  shasum.update(somthing);
  return shasum.digest('base64') ;  //hex, base64
  
}
let uid = 'admin';  //req.body.uid
let pwd = '1234';   //req.body.pwd
let pwdHash = ganerateHash(pwd);


conn.connect();

let sql = `select * from users where uid like ?`;
conn.query(sql, uid,(error, results, fields)=>{
  if (error) 
   console.log(error);
  // console.log(results);
  let result = results[0];
  console.log(results);
  if (result === undefined) {
    console.log(`로그인 실패: ${uid}이/가 없습니다.\n다시한번 uid를 확인해주세요`);
  }else{
    if (result.pwd === pwdHash) {
     console.log('login 성공');
   }else{
     console.log('login 실패: 패스워드가 틀렸습니다.');
   }
  }
});

conn.end();