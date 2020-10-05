const express = require('express')
const morgan = require('morgan')

let app = express();

app.use(morgan('short'));
app.use((req,res)=>{
  res.send('<h1>express Basic</h1>');
});

app.listen(3000, ()=>{
  console.log("Server Running at http://127.0.0.1:3000");
})