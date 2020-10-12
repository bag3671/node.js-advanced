const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./db/db-module');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  dm.getJoinLists(rows => {
    const View = require('./view/join');
    let html = View.mainForm(rows);
    res.send(html);
  })
  /* dm.getAllLists(rows => {
    const View = require('./view/list');
    let html = View.mainForm(rows);
    res.send(html);
  }) */
});

app.get('/insert', (req, res) => {
  const view = require('./view/insert');
  let html = view.insertForm();
  res.send(html);
});

app.post('/insert', (req, res) => {
  let title = req.body.title;
  let lyrics = req.body.lyrics;
  let params = [title, lyrics];
 dm.insertSong(params, ()=>{
   res.redirect('/');
 });
});

app.get('/delete/:hsid', (req, res) => {
  let hsid = parseInt(req.params.hsid);
  dm.deleteSong(hsid, ()=>{
    res.redirect('/');
  })
});

app.get('/update/:hsid', (req, res) => {
  let hsid = parseInt(req.params.hsid);
  dm.getSong(hsid, result=>{
    const View = require('./view/update');
    let html = View.updateForm(result);
    res.send(html);
  });
});

app.post('/update', (req, res) => {
  let hsid = parseInt(req.body.hsid);
  let title = req.body.title;
  let lyrics = req.body.lyrics;
  let params = [title, lyrics, hsid];
 
  dm.updateSong(params, ()=>{
    res.redirect('/');
  })
});


app.listen(3000, () => {
  console.log("Server Running at http://127.0.0.1:3000");
});