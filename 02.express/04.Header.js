const express = require('express');
const util = require('util')


let app = express();


app.get('/', (req, res) => {
  let agent = req.header('User-Agent');

  if(agent.toLowerCase().match(/chrome/)){
    res.send(`크롬 브라우저 입니다`);

  }else{
    res.send('크롬 브라우저가 아닙니다');
  }

});


app.get('*', (req, res) => {
  res.status(404).send('<h1>Path not found</h1>');
});
app.listen(52273, () => {
  console.log("Server Running at http://127.0.0.1:52273");
});
