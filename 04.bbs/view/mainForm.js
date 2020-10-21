const templete = require('./templete');
const express = require('express');
const fs = require('fs');
const app = express();
const moment = require('moment');
app.use(express.static(__dirname + '/public'));

module.exports = {
  mainForm: function (uname, rows, uid,pageNo,startPage,endPage,totalPage) {
    let date = moment().format('YYYY-MM-DD');
    let html = '';
    for (let row of rows) {
      if (row.replyCount === '0') {
        if (row.modTime !== date) {
          html += `
          <tr>
            <td>${row.bid}</td>
            <td><a href = "/bbs/${row.bid}/${uid}">${row.title}</a></td>
            <td>${row.uid}</td>
            <td>${row.modTime}</td>
            <td>${row.viewCount}</td>
          </tr>
          `;
        }else{
          html += `
        <tr>
          <td>${row.bid}</td>
          <td><a href = "/bbs/${row.bid}/${uid}">${row.title}</a></td>
          <td>${row.uid}</td>
          <td>${row.modTime2}</td>
          <td>${row.viewCount}</td>
        </tr>
        `;
        }
      }else{
        if (row.modTime !== date) {
          html += `
          <tr>
            <td>${row.bid}</td>
            <td><a href = "/bbs/${row.bid}/${uid}">${row.title}</a><small>[${row.replyCount}]</small></td>
            <td>${row.uid}</td>
            <td>${row.modTime}</td>
            <td>${row.viewCount}</td>
          </tr>
          `;
        }else{
          html += `
        <tr>
          <td>${row.bid}</td>
          <td><a href = "/bbs/${row.bid}/${uid}">${row.title}</a><small>[${row.replyCount}]</small></td>
          <td>${row.uid}</td>
          <td>${row.modTime2}</td>
          <td>${row.viewCount}</td>
        </tr>
        `;
        }
      }
    }
    return `
     ${templete.header2()}
     <body class="pt-5">
     ${templete.top(uname, uid)}
    <div class="container pt-5 pb-5">
    <table class="table table-hover">
    <h1 class = "text-center">게시판 목록</h1>
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
    ${templete.pagination(pageNo,startPage,endPage,totalPage)}   
    ${templete.footer()}
    </body>
    </html>
    `;
  },
  searchForm: function (uname, rows, uid,pageNo,startPage,endPage,totalPage) {
    let date = moment().format('YYYY-MM-DD');
    let html = '';
    for (let row of rows) {
      if (row.replyCount === '0') {
        if (row.modTime !== date) {
          html += `
          <tr>
            <td>${row.bid}</td>
            <td><a href = "/bbs/${row.bid}/${uid}">${row.title}</a></td>
            <td>${row.uid}</td>
            <td>${row.modTime}</td>
            <td>${row.viewCount}</td>
          </tr>
          `;
        }else{
          html += `
        <tr>
          <td>${row.bid}</td>
          <td><a href = "/bbs/${row.bid}/${uid}">${row.title}</a></td>
          <td>${row.uid}</td>
          <td>${row.modTime2}</td>
          <td>${row.viewCount}</td>
        </tr>
        `;
        }
      }else{
        if (row.modTime !== date) {
          html += `
          <tr>
            <td>${row.bid}</td>
            <td><a href = "/bbs/${row.bid}/${uid}">${row.title}</a><small>[${row.replyCount}]</small></td>
            <td>${row.uid}</td>
            <td>${row.modTime}</td>
            <td>${row.viewCount}</td>
          </tr>
          `;
        }else{
          html += `
        <tr>
          <td>${row.bid}</td>
          <td><a href = "/bbs/${row.bid}/${uid}">${row.title}</a><small>[${row.replyCount}]</small></td>
          <td>${row.uid}</td>
          <td>${row.modTime2}</td>
          <td>${row.viewCount}</td>
        </tr>
        `;
        }
      }
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
    <button class="btn btn-outline-primary float-right" onclick="location.href = '/bbs/list/1'">돌아가기</button> 
    </div>
    ${templete.pagination(pageNo,startPage,endPage,totalPage)}   
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
    ${templete.footer()}
    </body>
    </html>
    `;
  },
  BoardInfo: function (results, uname, uid, rows,) {
    
    let html = '';
    for (row of rows) {
      if (row.uid === uid) {
        html += `<tr><td><div class = "float-right text-dark  "style="background-color:rgb(255, 255, 240)"><span class="badge "><h5>${row.uid} </h5></span><small>${row.regtime}</small><br>${row.content}</div></td></tr>
        `;
      }else{
        html += `<tr><td><div class = "float-left text-dark  "style="background-color:rgb(213, 255, 255)"><span class="badge "><h5>${row.uid} </h5></span><small>${row.regtime}</small><br>${row.content}<div></td></tr>
        `;}
      }
      let buttonBox = '';
      if (results[0].uid === uid) {
        buttonBox += `
          <input type="button" class="btn btn-light" value="수정하기" onclick="location.href='/bbs/update/${results.bid}/${results.uid}'">
          <input type="button" class="btn btn-light" value="삭제하기" onclick="location.href='/bbs/delete/${results.bid}/${results.uid}'">
        `;
      }
     
    return `
    ${templete.header2()}
    ${templete.top(uname, uid)}
    <body class="pt-auto pb-5">
    ${templete.showBoard(results,buttonBox)}
    ${templete.replyForm(html)}
    ${templete.footer()}
    </body>
    </html>
    `;
  },
  updateboard: function (uid, result, uname) {
    return `
    ${templete.header2}
    ${templete.top(uname, uid)}
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
    ${templete.top(uname, uid)}
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
  },
  userListForm: function (uname, rows, uid) {
    let date = moment().format('YYYY-MM-DD');
    let html = '';
    for (let row of rows) {
          html += `
          <tr>
            <td>${row.uid}</td>
            <td><a href = "/user/uid/${row.uid}">${row.uname}</a></td>
            <td>${row.tel}</td>
            <td>${row.email}</td>
            <td>${row.regDate}</td>
          </tr>
          `;
    }
    return `
     ${templete.header2()}
     <body class="pt-5">
     ${templete.top(uname, uid)}
     <div class="container pt-5 pb-5">
     <h1 class = "text-center">사용자 관리</h1>
    <table class="table table-hover">
    
    <tr>
    <thead>
      <th>UID</th>
      <th>이름</th>
      <th>전화번호</th>
      <th>E-MAIL</th>
      <th>등록시간</th>
    </tr>
    </thead>
  
    <tbody>
    ${html} 
    </tbody>
    </table> 
    </div> 
    ${templete.footer()}
    </body>
    </html>
    `;
  },
  userInfo: function (results, uname, uid) {
    
    return `
    ${templete.header2()}
    ${templete.top(uname, uid)}
    <body class="pt-auto pb-5">
    ${templete.userInfoForm(results,uid)}
    ${templete.footer()}
    </body>
    </html>
    `;
  }


} 
