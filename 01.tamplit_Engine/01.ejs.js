const http = require('http')
const fs = require('fs')
const ejs = require('ejs')

//서버를 생성하고 실행합니다
http.createServer((request, response) => {
  //ejsPage.ejs파일을 읽습니다
  fs.readFile('01.ejsPage.ejs', 'utf8', (error, data) => {
    response.writeHead(200, { 'content-Type': 'text/html' });
    response.end(ejs.render(data));

  })
}).listen(52273, () => {
  console.log('Server Running at http://127.0.0.1:52273');
});
