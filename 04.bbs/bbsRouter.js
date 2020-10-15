const express = require('express');
const dm = require('./db/db-module');
const mainForm = require('./view/mainForm');
const templete = require('./view/templete');
const ut = require('./view/util')
const app = express();
app.use(express.static(__dirname + '/public'));

const bRouter = express.Router();
bRouter.get('/:bid', (req, res) => {
  let uname = req.session.uname;
  let uid = req.params.bid;
  dm.getBbs(uid, results => {

    let html = mainForm.BoardInfo(results, uname);
    res.send(html);
  })
});

bRouter.get('/update/:bid', (req, res) => {
  let bid = req.params.bid
  dm.getBbs(bid, result => {
    let html = templete.updateForm(result[0]);
    console.log(result[0]);
    res.send(html);
  })
})

bRouter.post('/update', (req,res)=>{
  let title = req.body.title;
  let content = req.body.content;
  let bid = req.body.bid
  let params = [title, content, bid]
  dm.updateBbs(params,()=>{
    res.redirect(`/bbs/${bid}`)
  })
})


module.exports = bRouter;