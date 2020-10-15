const express = require('express');
const dm  = require('./db/db-module');
const templete = require('./view/templete');
const ut = require('./view/util')

const uRouter = express.Router();
uRouter.get('/:bid', (req, res) => {
    const view = require('./view/userRegister');
    let html = view.register();
    res.send(html);
});

uRouter.post('/register', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let uname = req.body.uname;
    let pwdHash = ut.ganerateHash(pwd)
    if (pwd2 === pwd) {
      dm.registUser(uid, pwdHash, uname)
      const view = require('./view/alertMessage');
        let html = view.alertMsg('로그인 해주세요', '/login')
        res.send(html);
    }else{
      const view = require('./view/alertMessage');
        let html = view.alertMsg('login 실패: 패스워드가 틀렸습니다.', '/user/register')
        res.send(html);
    }
    
});

module.exports = uRouter;