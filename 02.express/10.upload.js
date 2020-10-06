const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const multer = require('multer')
const util = require('util');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multipart({ uploadDir: __dirname + '/public/upload' }));


app.get('/', (req, res) => {
  fs.readFile('10.fileuploadform.html', 'utf8', (error, data) => {
    res.send(data);
  });
});
app.post('/', (req, res) => {
  let comment = req.body.comment;
  let filename = req.files.image.name;
  let filetype = req.files.image.type;
  let uploadPath = req.files.image.path;
  // console.log(comment);
  // console.log(filename, filetype);
  // console.log(uploadPath);
  // console.log(filetype.indexOf('image'));

  //받은 파일이 이미지면 이름을 변경하고, 아니면 제거함.
  if (filetype.indexOf('image')>= 0) {
    let outputName = comment + filename;
    fs.rename(uploadPath, __dirname+'/public/upload/'+outputName, (error)=>{
      res.redirect('/')
    })
    // console.log( __dirname+'/public/upload/'+outputName);
  }else{
    fs.unlink(uploadPath, error =>{
      console.log("not img");
    })
    res.redirect('/');
  }

});

app.listen(3000, () => {
  util.log("Server Running at http://127.0.0.1:3000");
});