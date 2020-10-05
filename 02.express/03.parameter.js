const express = require('express')
const util = require('util')


let app = express();

//localhost://52273/query?id=kim
app.get('/query', (req, res) => {
  let id = req.query.id;
  res.send(`<h1>id - ${id}</h1>`);

});
//localhost://52273/rest/id/kim
app.get('/rest/id/:id', (req, res) => {
  let id = req.params.id;
  res.send(`<h1>id - ${id}</h1>`);
});
//localhost://52273/rest2/kim
app.get('/rest2/:id', (req, res) => {
  let id = req.params.id;
  res.send(`<h1>id - ${id}</h1>`);
});
app.get('*', (req, res) => {
  res.status(404).send('<h1>Path not found</h1>');
});
app.listen(52273, () => {
  console.log("Server Running at http://127.0.0.1:52273");
});
