const crypto = require('crypto')

module.exports = {
  ganerateHash: function (somthing) {
    let shasum = crypto.createHash('sha256');  
    shasum.update(somthing);
    return shasum.digest('base64') ; 
  }
}