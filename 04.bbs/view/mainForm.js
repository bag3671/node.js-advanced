const templete = require('./templete');

module.exports = {
  mainForm: function (uname, rows) {
    let html = '';
    for(let row of rows){
      html += `
      <tr>
        <td>${row.bid}</td>
        <td><a href = "/bbs/${row.bid}">${row.title}</a></td>
        <td>${row.uid}</td>
        <td>${row.modTime}</td>
        <td>${row.viewCount}</td>
      </tr>
      `;
    }
    return `
     ${templete.header2()}
     <body class="pt-5">
     ${templete.top(uname)}
    <div class="container pt-5">
    <table class="table table-hover">
    
    <tr>
    <thead>
      <th>번호</th>
      <th>제목</th>
      <th>글쓴이</th>
      <th>날짜</th>
      <th>조회수</th>
    </tr>
    </thead>
  
    <tbody>
    ${html} 
    </tbody>
    </table>    
    </div>
    ${templete.pagination()}   
    ${templete.footer()}
    </body>
    </html>
    `;
  },
  create : function () {
    return`
    ${templete.header2()}
    ${templete.top()}
    <body class="pt-auto">
    ${templete.createForm()}
    ${templete.pagination()}   
    ${templete.footer()}
    </body>
    </html>
    `;
  },
  BoardInfo : function (results,uname) {
    return`
    ${templete.header2()}
    ${templete.top2(uname)}
    <body class="pt-auto">
    ${templete.showBoard(results,uname)}
    ${templete.footer()}
    </body>
    </html>
    `;
  },
  existReply : function (rows) {
    let html = '';
    for (row of rows){
      html += `
      <td>${row.uid} : ${row.content}</td> 
  `
    }
    return`
    ${templete.header2()}
    <body class="pt-5">
    ${templete.top(uname)}
    `;
  }
  

} 
