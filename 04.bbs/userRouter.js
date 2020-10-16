const express = require('express');
const dm = require('./db/db-module');
const mainForm = require('./view/mainForm');
const templete = require('./view/templete');
const ut = require('./view/util')

const uRouter = express.Router();
uRouter.get('/register', (req, res) => {
  const view = require('./view/userRegister');
  let html = view.register();
  res.send(html);
});

uRouter.post('/register', (req, res) => {
  let uid = req.body.uid;
  let pwd = req.body.pwd;
  let pwd2 = req.body.pwd2;
  let uname = req.body.uname;
  let email = req.body.email;
  let tel = req.body.tel;
  let pwdHash = ut.ganerateHash(pwd)
  if (pwd2 === pwd) {
    dm.registUser(uid, pwdHash, uname, email, tel)
    const view = require('./view/alertMessage');
    let html = view.alertMsg('로그인 해주세요', '/login')
    res.send(html);
  } else {
    const view = require('./view/alertMessage');
    let html = view.alertMsg('login 실패: 패스워드가 틀렸습니다.', '/user/register')
    res.send(html);
  }

});
uRouter.get('/update/:uid', (req, res) => {
  let uname = req.session.uname;
  console.log(uname);
  let uid = req.params.uid
  dm.getUserInfo(uid, result => {
    console.log(uname,uid);
    console.log(result);
    const view = require('./view/mainForm')
    let html = view.updateUser(result, uname, uid)
    res.send(html);
  })
})

uRouter.post('/update',(req,res)=>{
  let uname = req.body.uname
  let pwd = req.body.pwd
  let pwd2 = req.body.pwd2
  let tel = req.body.tel
  let email = req.body.email
  let uid = req.body.uid
  if (pwd === pwd2) {
    let pwdHash = ut.ganerateHash(pwd)
    let params = [uname, pwdHash, tel, email, uid]
    dm.updateUser(params, ()=>{
      res.redirect('/bbs/list');
    });
  }else{  //패스워드 입력이 잘못된 경우
    const view = require('./view/alertMessage');
    let html = view.alertMsg('패스워드가 일치하지 않습니다', `/update/${uid}`);
    res.send(html);
  }
})

module.exports = uRouter;