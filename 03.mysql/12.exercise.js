const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./db/exer-db-module');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
  dm.getAllLists(rows =>{
    const view = require('./view/exer-list')
    let html = view.mainForm(rows);
    res.send(html);
  });
});

app.get('/insert',(req,res)=>{
const view = require('./view/exer-insert')
let html = view.insertForm();
res.send(html)
})

app.post('/insert',(req,res)=>{
  let name = req.body.name;
  let debut = req.body.debutday;
  let params = [name, debut];
  dm.insertGirlGroup(params, ()=>{
    res.redirect('/');
  });
});

app.get('/delete/:ggid',(req,res)=>{
  let ggid = parseInt(req.params.ggid);
  dm.deleteGirlGroup(ggid,()=>{
    res.redirect('/');
  })
});

app.get('/update/:ggid',(req,res)=>{
  let ggid = parseInt(req.params.ggid);
  dm.getGirlGroup(ggid, result=>{
    const view = require('./view/exer-update');
    console.log(result, ggid);
    let html = view.updateForm(result);
    res.send(html);
  });
});

app.post('/update',(req,res)=>{
  console.log(req.body);
  let ggid = parseInt(req.body.ggid);
  let name = req.body.name;
  let debut = req.body.debut;
  let params = [name, debut, ggid];
  dm.updateGirlGroup(params, ()=>{
    res.redirect('/');
  })
})

app.listen(3000, () => {
  console.log("Server Running at http://127.0.0.1:3000");
});