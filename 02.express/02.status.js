const express = require('express')
const util = require('util')


let app = express();

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
      <h1>Welcome to Express World</h1>
    </body>
    </html>
`;
  res.send(html);

});
app.get('*', (req, res) => {
  res.status(404).send('<h1>Path not found</h1>');
});
app.listen(52273, () => {
  util.log("Server Running at http://127.0.0.1:52273");
});
