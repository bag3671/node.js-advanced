const express = require('express');
const  data  = require('jquery');
const  getConnection  = require('./db/db-module');
const dm = require('./db/db-module');
const mainForm = require('./view/mainForm');
const templete = require('./view/templete');
const ut = require('./view/util')
const app = express();
app.use(express.static(__dirname + '/public'));

const bRouter = express.Router();
bRouter.get('/list',ut.isLoggedin, (req,res)=>{
  dm.getAllLists(rows =>{
    const view = require('./view/mainForm');
    let uname = req.session.uname
    let uid = req.session.uid
    let html = view.mainForm(uname,rows,uid);
    res.send(html);
  })
})
bRouter.get('/create',(req,res)=>{
  let html = mainForm.create();
  res.send(html);
})

bRouter.post('/create',(req,res)=>{
  let title = req.body.title;
  let content = req.body.content
  let uid = req.session.uid
  let params= [uid,title,content]
  dm.createBoard(params,()=>{
    res.redirect('/bbs/list')
  })
})


bRouter.get('/list/:bid/:uid', (req, res) => {
  let uname = req.session.uname;
  let bid = req.params.bid;
  let uid = req.params.uid
  dm.getBbs(bid, results => {
    dm.getReply(bid,resultRp=>{
      let html = mainForm.BoardInfo(results, uname, uid, resultRp);
      res.send(html);
    })
  })
});

bRouter.get('/update/:bid/:uid', ut.isLoggedin, (req, res) => {
  let uid = req.params.uid
  let bid = req.params.bid
  let suid = req.session.uid
  let uname = req.session.uname
  if (uid === suid) {
    dm.getBbs(bid, result => {
      let html = mainForm.updateboard( uid,result[0],uname);
      res.send(html);
    })
  } else {
    const view = require('./view/alertMessage');
    let html = view.alertMsg(`수정 권한이 없습니다`, `/bbs/list/${bid}/${uid}`)
    res.send(html);
  }
})

bRouter.post('/update/:bid', ut.isLoggedin, (req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  let bid = req.body.bid
  let uid = req.body.uid
  let params = [title, content, bid]
  dm.updateBbs(params, () => {
    res.redirect(`/bbs/list/${bid}/${uid}`)
  })
})
bRouter.get('/delete/:bid/:uid', ut.isLoggedin, (req, res) => {
  let uid = req.params.uid
  let bid = req.params.bid
  let suid = req.session.uid
  if (uid === suid) {
    dm.deleteBbs(bid, () => {
      res.redirect(`/bbs/list`)
    })
  } else {
    const view = require('./view/alertMessage');
    let html = view.alertMsg(`삭제권한이 없습니다`, `/bbs/${bid}/${uid}`)
    res.send(html);
  }
}
)
bRouter.get('/list/page/:page/:bid/:uid', ut.isLoggedin, (req,res)=>{
  let uname = req.session.uname;
  let bid = req.params.bid;
  let uid = req.params.uid;
  dm.pagingList(result =>{
    dm.getAllLists(result=>{
      console.log(result);
    } )
  })
})
bRouter.post('/list/:bid/:uid',ut.isLoggedin,(req,res)=>{
  let bid = req.params.bid
  let uidBoard = req.params.uid
  let uidLogin = req.session.uid
  let comment = req.body.comment
  console.log(comment);
  let params = [bid, uidLogin, comment]
  dm.createRply(params,()=>{
    res.redirect(`/bbs/list/${bid}/${uidBoard}`)
  })

})
bRouter.get('/reply/delete/:bid/:uid',ut.isLoggedin,(req,res)=>{
  let bid = req.params.bid
  let uidBoard = req.params.uid
  let uidLogin = req.session.uid
  let rid = req
  console.log(rid);
})


module.exports = bRouter;