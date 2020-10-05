const { response } = require('express');
const express = require('express')
const util = require('util')


let app = express();

app.use((request, response)=>{
  let html = `
  <!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Express</title>
</head>
<body>
  <h1>Welcome to Express World</h1>
</body>
</html>
`;
  response.send(html);
  response.redirect();
}).listen(52273, ()=>{
  util.log("Server Running at http://127.0.0.1:52273");
});
