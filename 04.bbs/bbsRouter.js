const express = require('express');
const  data  = require('jquery');
const  getConnection  = require('./db/db-module');
const dm = require('./db/db-module');
const mainForm = require('./view/mainForm');
const templete = require('./view/templete');
const ut = require('./view/util')
const app = express();
const multer = require('multer')
const upload = multer({
  storage: multer.diskStorage({
      // set a localstorage destination
      destination: __dirname + '/public/uploads/',
      // set a file name
      filename: (req, file, cb) => {
          cb(null, new Date().toISOString().replace(/[-:\.A-Z]/g, '') + '_' + file.originalname);
      }
  })
});
app.use(express.static(__dirname + '/public'));
const bRouter = express.Router();
bRouter.get('/list/:page',ut.isLoggedin, (req,res)=>{
  let page = parseInt(req.params.page);
  req.session.currentPage = page;
  let curPage = page
  let offset = (page - 1) * 10;
  dm.getBbsTotalCount(result=>{
    let page_list_size = 10;
    let page_size = 10
    let totalPage = Math.ceil(result.count / page_size); //전체페이지수
    if (result.count < 0)
      result.count = 0
    let totalSet = Math.ceil(result.count / page_list_size); //전체 세트 수
    let curSet = Math.ceil(curPage / page_list_size);//현재세트 번호
    let startPage = ((curSet - 1) * 10) + 1//세트내 출력될 시작 페이지
    let endPage = Math.ceil(page/10)*10;//현재 세트내 출력될 마지막 페이지
    endPage = (endPage > totalPage) ? totalPage : endPage;
    dm.getBbsList(offset, rows=>{
      const view = require('./view/mainForm')
      let uname = req.session.uname
      let uid = req.session.uid
      let html = view.mainForm(uname,rows,uid,page,startPage,endPage,totalPage);
      res.send(html);
    })
  })
})
bRouter.get('/create',(req,res)=>{
  console.log(req.session.uname);
  let uname = req.session.uname
  let uid = req.session.uid
  let html = mainForm.create(uname,uid);
  res.send(html);
})

bRouter.post('/create',(req,res)=>{
  let title = req.body.title;
  let content = req.body.content
  let uid = req.session.uid
  let params= [uid,title,content]
  dm.createBoard(params,()=>{
    res.redirect('/bbs/list/1')
  })
})


bRouter.get('/:bid/:uid',ut.isLoggedin, (req, res) => {
  let uname = req.session.uname;
  let bid = req.params.bid;
  let uid = req.params.uid
  dm.getBbs(bid, results => { 
    dm.getReply(bid,resultRp=>{
      let html = mainForm.BoardInfo(results, uname, uid, resultRp,bid);
      res.send(html);
      if (results[0].uid !== req.session.uid) {
        dm.increaseViewCount(bid,result=>{})
      }
    })
  })
});

bRouter.get('/update/:bid/:uid', ut.isLoggedin,upload.single('upload'), (req, res) => {
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
    let html = view.alertMsg(`수정 권한이 없습니다`, `/bbs/${bid}/${uid}`)
    res.send(html);
  }
})

bRouter.post('/update/:bid', ut.isLoggedin,upload.single('upload'),(req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  let bid = req.body.bid
  let uid = req.body.uid
  let params = [title, content, bid]
  dm.updateBbs(params, () => {
    res.redirect(`/bbs/${bid}/${uid}`)
  })
})
bRouter.get('/delete/:bid/:uid',ut.isLoggedin,(req, res) => {
  let uid = req.params.uid
  let bid = req.params.bid
  let suid = req.session.uid
  if (uid === suid) {
    dm.deleteBbs(bid, () => {
      res.redirect(`/bbs/list/1`)
    })
  } else {
    const view = require('./view/alertMessage');
    let html = view.alertMsg(`삭제권한이 없습니다`)
    res.send(html);
  }
});

bRouter.post('/:bid/:uid',ut.isLoggedin,(req,res)=>{
  let bid = req.params.bid
  let uidBoard = req.params.uid
  let uidLogin = req.session.uid
  let comment = req.body.comment
  let params = [bid, uidLogin, comment]
  dm.createRply(params,()=>{
    dm.increaseReplyCount(bid,()=>{
      res.redirect(`/bbs/${bid}/${uidBoard}`)
    })
  })

})
bRouter.get('/reply/delete/:bid/:uid/:rid',ut.isLoggedin,(req,res)=>{
  let bid = req.params.bid
  let uidBoard = req.params.uid
  let uidLogin = req.session.uid
  let rid = req.params.rid
  dm.getReply2(rid,result=>{
    if (uidLogin === result[0].uid) {
      dm.deleteReply(rid,()=>{
        dm.decreaseReplyCount(bid,()=>{
          res.redirect(`/bbs/${bid}/${uidBoard}`)
        })
      })
    }else{
      const view = require('./view/alertMessage');
      let html = view.alertMsg(`삭제권한이 없습니다`, `/bbs/${bid}/${uidBoard}`)
      res.send(html);
    }
  })
    
  })
bRouter.post(`/search`,ut.isLoggedin,(req,res)=>{
  let keyword = '%'+req.body.title+'%'
  let seachTitle = req.body.title
  dm.findTitle(keyword, rows=>{
    const view = require('./view/mainForm')
    let uname = req.session.uname
    let uid = req.session.uid
    let html = view.searchForm(uname,rows,uid,seachTitle)
    res.send(html);
  })
})
bRouter.post('/uploadImage',upload.single('upload'), (req, res) => {
  console.log(req.file);
  let fileUrl = '/uploads/' + req.file.filename;
  console.log(fileUrl);
  let jsonResponse = {
      uploaded: 1,
      fileName: req.file.filename,
      url: fileUrl
  };
  res.send(JSON.stringify(jsonResponse));
});


module.exports = bRouter;