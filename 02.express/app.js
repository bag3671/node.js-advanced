const express = require('express');
const bodyparser = require('body-parser');
const util = require('util');
const qs = require('querystring');
const fs = require('fs');
const view = require('./view/index');
const template = require('./view/template');
const process = require('process');

const app = express();
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  fs.readdir('data', function (error, filelist) {
    let list = template.listGen(filelist);
    let content = template.HOME_CONTENTS;
    let control = template.buttonGen();
    let html = view.index('Web 기술', list, content, control);
    res.send(html);
  })
})

app.get('/id/:id', (req, res) => {
  fs.readdir('data', function (error, filelist) {
    let list = template.listGen(filelist);
    let title = req.params.id;
    let control = template.buttonGen(title);
    let filepath = 'data/' + title + '.txt';
    fs.readFile(filepath, 'utf8', (error, buffer) => {
      buffer = buffer.replace(/\n/g, '<br>')
      let html = view.index(title, list, buffer, control);
      res.send(html);
    });
  });
})
app.get('/create', (req, res) => {
  fs.readdir('data', function (error, filelist) {
    let list = template.listGen(filelist);
    let content = template.createForm();
    let control = template.buttonGen();
    let html = view.index('글 생성', list, content, control);
    res.send(html);
  });
})
app.post('/create', (req, res) => {
  let subject = req.body.subject
  let description = req.body.description
  let filepath = 'data/' + subject + '.txt';
  fs.writeFile(filepath, description, error => {
    // let encoded = encodeURI(`/id/${subject}`)
    // res.status(302).redirect(encoded);
    res.redirect(`/id/${subject}`)
  });
});
app.get('/delete/id/:id', (req, res) => {
  fs.readdir('data', function (error, filelist) {
    let title = req.params.id
    let list = template.listGen(filelist);
    let content = template.deleteForm(title);
    let control = template.buttonGen();
    let html = view.index('글 삭제', list, content, control);
    res.send(html);
    console.log(title);
  });

});
app.post('/delete', (req, res) => {
  let title = req.body.subject
  let filepath = 'data/' + title + '.txt';
  fs.unlink(filepath, error => {
    res.status(302).redirect('/');
  });
});



app.get('/update/id/:id', (req, res) => {
  fs.readdir('data', function (error, filelist) {
    let list = template.listGen(filelist);
    let title = req.params.id;
    let control = template.buttonGen();
    let filename = 'data/' + title + '.txt';
    fs.readFile(filename, 'utf8', (error, buffer) => {

      let content = template.updateForm(title, buffer)
      let html = view.index(`${title} 수정`, list, content, control);
      res.send(html);
    });
  });

});
app.post('/update', (req, res) => {
  let subject = req.body.subject;
  let description = req.body.description;
  let original = req.body.original
  console.log(original);
  let filepath = 'data/' + original + '.txt';
  console.log(filepath);
  fs.writeFile(filepath, description, error => {
    if (original != subject) {
      fs.renameSync(filepath, `data/${subject}.txt`)
    }
    res.status(302).redirect(`/id/${subject}`);
  });
});





app.get('*', (req, res) => {
  res.status(404).send('path not defined');
});
app.listen(3000, () => {
  console.log("Server Running at http://127.0.0.1:3000");
})
