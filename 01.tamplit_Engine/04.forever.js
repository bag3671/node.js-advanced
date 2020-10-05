/* const http = require('http')
http.createServer((request, response)=>{  
}) */
require('http').createServer((request, response)=>{
  if(request.url === '/'||request.url === 'favocin.ico'){
    let html = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Forever</title>
    </head>
    <body>
      <h1>Forever</h1>
    </body>
    </html>
    `;
    response.end(html);
  }else{
    //오류를 발생합니다
    error.error.error();
  }
}).listen(52273, ()=>{
  console.log('Server Running at http://127.0.0.1:52273');
})