const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser')
const favicon = require('express-favicon')
const dm = require('./db/userdb-module');
const am = require('./view/alertMessage');
const ut = require('./28-1.util');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('1q2w3e4r5t6y'));
app.use(session({
  secret: '1q2w3e4r5t6y',
  resave: false,
  saveUninitialized: true,
  store: new FileStore({ logfn: function () { } })
}))



app.get('/', ut.isLoggedin, (req, res) => {
  dm.getAllLists(rows => {
    const View = require('./view/rightList');
    let html = View.mainForm(req.session.uname, rows);
    res.send(html);
  })
});

app.get('/login', (req, res) => {
  const view = require('./view/userlogin')
  let html = view.loginForm();
  res.send(html);
})

app.post('/login', (req, res) => {
  let uid = req.body.uid
  let pwd = req.body.pwd
  let pwdHash = ut.ganerateHash(pwd)
  dm.getUserInfo(uid, result => {
    if (result === undefined) {
      const view = require('./view/alertMessage');
      let html = view.alertMsg(`로그인 실패: ${uid}이/가 없습니다. 다시한번 uid를 확인해주세요`, '/login')
      res.send(html);
    } else {
      if (result.pwd === pwdHash) {
        req.session.uid = uid;
        req.session.uname = result.uname;
        console.log('login 성공');
        req.session.save(() => {
          res.redirect('/')
        });
      } else {
        const view = require('./view/alertMessage');
        let html = view.alertMsg('login 실패: 패스워드가 틀렸습니다.', '/login')
        res.send(html);
        console.log('login 실패: 패스워드가 틀렸습니다.');
      }
    }
  });
});

app.get('/delete/:uid', ut.isLoggedin, (req, res) => {
  let uid = req.params.uid;
  if (req.params.uid === req.session.uid) {    //권한있음
    dm.deleteUser(req.params.uid, () => {
      res.redirect('/');
    })
  } else {
    const view = require('./view/alertMessage');
    let html = view.alertMsg('삭제 권한이 없습니다', '/');
    res.send(html);
  }
})

app.get('/update/:uid', ut.isLoggedin, (req, res) => {
  let uid = req.params.uid;
  if (req.params.uid === req.session.uid) {    //권한있음
    dm.getUserInfo(req.params.uid, (result) => {
      const view = require('./view/userupdate');
      let html = view.updateForm(result);
      res.send(html);
    })
  } else {
    const view = require('./view/alertMessage');
    let html = view.alertMsg('수정 권한이 없습니다. ', '/');
    res.send(html);
  }
})

app.post('/update', ut.isLoggedin, (req, res) => {
  let uid = req.body.uid;
  let pwd = req.body.pwd;
  let pwd2 = req.body.pwd2;
  console.log(pwd, pwd2);
  if (pwd === pwd2) {
    let pwdHash = ut.ganerateHash(pwd)
    let params =[pwdHash, uid];
    dm.updateUser(params, ()=>{
      res.redirect('/');
    });
  }else{  //패스워드 입력이 잘못된 경우
    const view = require('./view/alertMessage');
    let html = view.alertMsg('패스워드가 일치하지 않습니다', `/update/${uid}`);
    res.send(html);
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
})



app.listen(3000, () => {
  console.log("Server Running at http://127.0.0.1:3000");
});