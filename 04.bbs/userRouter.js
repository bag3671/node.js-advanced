const express = require('express');
const session = require('express-session');
const dm = require('./db/db-module');
const mainForm = require('./view/mainForm');
const templete = require('./view/templete');
const ut = require('./view/util')
const multer = require('multer')
const path = require('path')

const uRouter = express.Router();
let upload = multer({
  storage : multer.diskStorage({
    destination : function (req,file,cb) {
      cb(null,__dirname +'/./public/uploads/');
    },
    filename:function (req,file,cb) {
      cb(null,new Date().toISOString().replace(/[-:\.A-Z]/g, '') + '_' + file.originalname);
    }
  }),  
});

uRouter.get('/register', (req, res) => {
  const view = require('./view/userRegister');
  let html = view.register();
  res.send(html);
});

uRouter.post('/register', upload.single('photo'), (req, res) => {
  let uid = req.body.uid;
  let pwd = req.body.pwd;
  let pwd2 = req.body.pwd2;
  let uname = req.body.uname;
  let email = req.body.email;
  let tel = req.body.tel;
  let pwdHash = ut.ganerateHash(pwd)
  if (uid ===``||pwd===``||uname===``||req.file===undefined) {
    const view = require('./view/alertMessage')
    let html = view.alertMsg('입력된 정보를 확인해주세요')
    res.send(html);
  }else{
    if (pwd2 === pwd) {
      let photo = req.file.filename
      dm.registUser(uid, pwdHash, uname, email, tel, photo)
      const view = require('./view/alertMessage');
      let html = view.alertMsg2('로그인 해주세요','/login')
      res.send(html);
    } else {
      const view = require('./view/alertMessage');
      let html = view.alertMsg('login 실패: 패스워드가 틀렸습니다.')
      res.send(html);
    } 
  }
 
});
uRouter.get('/update/:uid',upload.single('photo'), ut.isLoggedin,(req, res) => {
  let uname = req.session.uname;
  let uid = req.params.uid
  dm.getUserInfo(uid, result => {
    const view = require('./view/mainForm')
    let html = view.updateUser(result, uname, uid)
    res.send(html);
  })
})

uRouter.post('/update',upload.single('photo'),ut.isLoggedin,(req,res)=>{
  let uname = req.body.uname
  let pwd = req.body.pwd
  let pwd2 = req.body.pwd2
  let tel = req.body.tel
  let email = req.body.email
  let uid = req.body.uid
  let file = req.file
  if (file === undefined) {
    if (pwd !== pwd2 || pwd === '') {
      const view = require('./view/alertMessage');
      let html = view.alertMsg('패스워드를 확인하세요', `/user/update/${uid}`);
      res.send(html);
    }else{  //패스워드 입력이 잘못된 경우
      let pwdHash = ut.ganerateHash(pwd)
      let params = [uname, pwdHash, tel, email, uid]
      dm.updateUser(params, ()=>{
        res.redirect('/bbs/list/1');
      });
    }
  }else{
    if (pwd !== pwd2 || pwd === '') {
      const view = require('./view/alertMessage');
      let html = view.alertMsg('패스워드를 확인하세요', `/user/update/${uid}`);
      res.send(html);
    }else{  //패스워드 입력이 잘못된 경우
      let photo = file.filename
      let pwdHash = ut.ganerateHash(pwd)
      let params = [uname, pwdHash, tel, email,photo, uid]
      dm.updateUserPhoto(params, ()=>{
        res.redirect('/bbs/list/1');
      });
    }
  }
})

uRouter.get('/delete',ut.isLoggedin,(req,res)=>{
  let uid = req.session.uid
  dm.deleteUser(uid,()=>{
    res.redirect('/logout')
  })
})

uRouter.get('/management',ut.isLoggedin,(req,res)=>{
  let uid = req.session.uid
  let uname = '관리자';
  if (uid === 'admin') {
    dm.getUserList(rows=>{
      const view = require('./view/mainForm')
      let html = view.userListForm(uname,rows,uid)
      res.send(html)
    })
  }else{
    const view = require('./view/alertMessage');
    let html = view.alertMsg('권한이 없습니다', '/')
    res.send(html);
  }
})

uRouter.get('/uid/:uid',ut.isLoggedin,(req,res)=>{
  let uid = req.params.uid
  let uname = req.session.uname
  dm.getUserInfo(uid,result=>{
    const view = require('./view/mainForm')
      let html = view.userInfo(result,uname,uid)
      res.send(html)
  })
})
uRouter.get('/delete/:uid',ut.isLoggedin,(req,res)=>{
  let uid = req.params.uid
  dm.deleteUser(uid,()=>{
    res.redirect('/user/management')
  })
})
module.exports = uRouter;