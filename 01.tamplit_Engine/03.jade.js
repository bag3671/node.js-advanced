const http = require('http');
const jade = require('jade');
const fs = require('fs');

//서버를 생성하고 실행합니다
http.createServer((request, Response)=>{
  //jade파일을 읽습니다.
  fs.readFile('03.jadePage.jade', 'utf8', (error, data)=>{
    //jade모듈을 사용합니다.
    var fn = jade.compile(data);
  });
}).listen(52273,()=>{
  console.log('Server Running at http://127.0.0.1:52273');
});