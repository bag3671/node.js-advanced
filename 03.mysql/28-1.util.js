const crypto = require('crypto');


module.exports = {
  ganerateHash: function (somthing) {
    let shasum = crypto.createHash('sha256');  
    shasum.update(somthing);
    return shasum.digest('base64') ; 
  },
  isLoggedin : function(req, res, next) {
    if (!req.session.uid) {      //로그인이 된 상태
      res.redirect('/login');
    } else {
      next();
    }
  }
  
  
    
  
}