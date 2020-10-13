const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./db/userdb-module');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  dm.getAllLists(rows => {
    const View = require('./view/userlist');
    let html = View.mainForm(rows);
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
  let pwdHash = dm.ganerateHash(pwd)
  dm.getUserInfo(uid, result => {
    if (result === undefined) {
      const view = require('./view/alertMessage');
      let html = view.alertMsg(`로그인 실패: ${uid}이/가 없습니다. 다시한번 uid를 확인해주세요`,'/login')
      res.send(html);
    } else {
      if (result.pwd === pwdHash) {
        console.log('login 성공');
        res.redirect('/')
      } else {
        const view = require('./view/alertMessage');
        let html = view.alertMsg('login 실패: 패스워드가 틀렸습니다.', '/login')
        res.send(html);
        console.log('login 실패: 패스워드가 틀렸습니다.');
      }
    }
  });
});



app.listen(3000, () => {
  console.log("Server Running at http://127.0.0.1:3000");
});