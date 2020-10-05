const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const util = require('util');


const app = express();
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res)=>{
setTimeout(() => {
  res.redirect('/login')
}, 1000);
});
app.get('/login',(req,res)=>{

  fs.readFile('09.loginForm.html','utf8',(error,data)=>{
    res.send(data);
  });
});
app.post('/login',(req,res)=>{
  let uid = req.body.uid;
  let pwd = req.body.pwd;
  util.log(uid, pwd);
  if (uid === 'park'&&pwd === '1234') {
    res.send(`<h1>Login Success</h1>`);
    }else{
      res.redirect('/login')
    }
})


app.listen(3000, ()=>{
  util.log("Server Running at http://127.0.0.1:3000");
});