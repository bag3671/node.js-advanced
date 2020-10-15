const express = require('express');
const fs = require('fs')
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');
const templete = require('./view/templete');
const uRouter = require('./userRouter');
const bRouter = require('./bbsRouter');
const ut = require('./view/util')
const dm = require('./db/db-module');
const test = require('./view/mainForm');

const app = express();
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/@popperjs/core/dist/umd'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false})); 
app.use(cookieParser('1q2w3e4r5t6y'));
app.use(session({
    secret: '1q2w3e4r5t6y',     // keyboard cat
    resave: false,
    saveUninitialized: true,
    store: new FileStore({logFn: function(){}})
}));
app.use('/user', uRouter);
app.use('/bbs', bRouter);

app.get('/', (req,res)=>{
  dm.getAllLists(rows =>{
    const view = require('./view/mainForm');
    let uname = req.session.uname
    let html = view.mainForm(uname,rows);
    res.send(html);
  })
})

app.get('/login',(req,res)=>{
  fs.readFile('./view/loginForm.html', 'utf8', (error, data) => {
    res.send(data);
});
});

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

app.get('/create',(req,res)=>{
  let html = test.create();
  res.send(html);
})

app.post('/create',(req,res)=>{
  let title = req.body.title;
  let content =  req.body.content
  let uid = req.session.uid
  let params= [uid,title,content]
  dm.createBoard(params,()=>{
    res.redirect('/')
  })
})

app.get('/logout', (req,res)=>{
  req.session.destroy();
  res.redirect('/login');
})

app.listen(3000, () => {
  console.log("Server Running at http://127.0.0.1:3000");
});