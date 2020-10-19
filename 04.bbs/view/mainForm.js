const templete = require('./templete');
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.static(__dirname + '/public'));

module.exports = {
  mainForm: function (uname, rows, uid) {
    let html = '';
    for (let row of rows) {
      html += `
      <tr>
        <td>${row.bid}</td>
        <td><a href = "/bbs/list/${row.bid}/${uid}">${row.title}</a></td>
        <td>${row.uid}</td>
        <td>${row.modTime}</td>
        <td>${row.viewCount}</td>
      </tr>
      `;
    }
    return `
     ${templete.header2()}
     <body class="pt-5">
     ${templete.top(uname, uid)}
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
  create: function () {
    return `
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
  BoardInfo: function (results, uname, uid, rows) {
    let html = '';
    for (row of rows) {
      html += `<tr><td><span class="badge badge-primary"><h5>${row.uid} : </h5></span>${row.content}
      <button type="button" class="btn btn-primary float-right">삭제</button></td></tr>
      `;}
    return `
    ${templete.header2()}
    ${templete.top2(uname, uid)}
    <body class="pt-auto">
    ${templete.showBoard(results, uid)}
    ${templete.replyForm(html)}
    ${templete.footer()}
    </body>
    </html>
    `;
  },
  updateboard: function (uid, result, uname) {
    return `
    ${templete.header2}
    ${templete.top2(uname, uid)}
    <body class="pt-auto">
    ${templete.updateForm(result, uid)}
    ${templete.footer()}
    </body>
    </html>
    `;
  },
  updateUser: function (result, uname, uid) {
    return `
    ${templete.header2}
    ${templete.top2(uname, uid)}
    <body class="pt-auto">
    ${templete.updateUserForm(result, uid)}
    ${templete.footer()}
    </body>
    </html>
    `;
  },
  existReply: function (rows) {
    let html = '';
    for (row of rows) {
      html += `
      <td>${row.uid} : ${row.content}</td> 
  `
    }
    return `
    ${templete.header2()}
    <body class="pt-5">
    ${templete.top(uname)}
    `;
  },
  pagingList: function (result) {
    let html = '';
    for (let i = result.startPage; i < result.endPage;) {
      if (curPage < 0) {
        break;
      } else {
          html += `
                <li value=${i}  class='active' >
                <a href='/pasing/${i} '>
                ${i} 
                </a>
                </li>
                `;
      };
      return `
      <div class="container">
        <ul class="pager">
          <li value="${startPage-1}" class="previous">
            <a href="'/list/page/${startPage-1}'">이전페이지</a>
          </li>
          ${html}
          <li value="${endPage+1}" class="next">
            <a href="'/list/page/${endPage+1}'">다음페이지</a>
          </li>
        </ul>
      </div>
      `
    }

    return `<div class="container">
      <ul class="pager">
      <li value="${startPage}-1" class="previous">
      <a href="'/list/page/${startPage - 1}'">이전페이지</a>
    </li>`;



  }


} 
