const express = require('express');
const http = require('http');
const favicon = require('express-favicon');
const util = require('util')


let app = express();
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  let html = `
      <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Express</title>
    </head>
    <body>
      <h1>Static Image</h1>
      <hr>
      <img src="/norwegian-forest-cat.jpg" alt="고양이">
      <img src="/img/dog.jpg" alt="개">
    </body>
    </html>
      `;
      res.send(html)


});


app.get('*', (req, res) => {
  res.status(404).send('<h1>Path not found</h1>');
});
app.listen(3000, () => {
  console.log("Server Running at http://127.0.0.1:3000");
});
