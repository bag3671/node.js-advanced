const { response } = require('express');
const express = require('express');

let app = express();
app.use(express.static(__dirname + '/public'));
let shoppingRouter = express.Router();
let customerRouter = express.Router();
app.use('/shopping', shoppingRouter)
app.use('/customer', customerRouter)

app.get('/', (req, res)=>{
  res.send('<h1>Root Router</h1>')
});
shoppingRouter.get('/', (req, res)=>{
  res.send('<h1>shoppingRouter</h1>')
})
shoppingRouter.get('/index', (req, res)=>{
  res.send('<h1>shoppingRouter index</h1>')
})
customerRouter.get('/', (req, res)=>{
  res.send('<h1>customerRouter</h1>')
})
customerRouter.get('/index', (req, res)=>{
  res.send('<h1>customerRouter index</h1>')
})

app.get('*', (req, res) => {
  res.status(404).send('<h1>Path not found</h1>');
});
app.listen(3000, () => {
  console.log("Server Running at http://127.0.0.1:3000");
});
