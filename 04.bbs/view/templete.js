
module.exports = {
  header2: function () {
    return `
    <!DOCTYPE html>
<html lang="ko">
<head>
  
    <title>게시판</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    
  
</head >
    `
  },

  header: function () {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Bootstrap Example</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
      <link rel="stylesheet" href="/fontawesome-free-5.15.1-web/css/all.min.css">
      <script src="/jquery/jquery.min.js"></script>
      <script src="/popper.js/popper.min.js"></script>
      <script src="/bootstrap/css/js/bootstrap.min.js"></script>
    </head>
    `
  },
  top: function (uname, uid) {
    let managementButton = '';
    console.log(uid);
    if (uid === 'admin') {
      managementButton += `
      <h5><a class="nav-link ml-2 text-dark" href="/user/management">사용자관리</a></h4>
      `;
    }
    return `
  <nav class="navbar navbar-expand-lg bg-light navbar-light fixed-top">
    <!-- Brand/logo -->
    <a class="navbar-brand" href="#">
      <img src="/img/logo.jpg" alt="logo" style="height:40px;margin-left: 40px;margin-right: 50px;">
    </a>

    <!-- Links -->
    <ul class="nav mx-auto">
      <li class="nav-item">
      <!--<h4><a class="nav-link ml-2 text-light" href="/bbs/list/1">홈</a></h4>-->
      <a class="navbar-brand" href="/bbs/list/1">
        <img src="/img/home.png" alt="home" style="height:40px;margin-right: 10px;" >
      </a>
      </li>
      <li class="nav-item">
      <!--<h4><a class="nav-link ml-2 text-light" href="/bbs/create">글쓰기</a></h4>-->
        <a class="navbar-brand" href="/bbs/create">
          <img src="/img/pen.png" alt="write" style="height:40px;margin-right: 10px;" >
        </a>
      </li>
      <li class="nav-item">
      <!--<h4><a class="nav-link ml-2 text-light" href="/user/update/${uid}">개인정보 수정</a></h4>-->
        <a class="navbar-brand" href="/user/update/${uid}">
          <img src="/img/information.png" alt="information" style="height:40px;margin-right: 10px;" >
        </a>
      </li>
      <li class="nav-item">
      <!--<h4><a class="nav-link ml-2 text-light" href="/logout" >로그아웃</a></h4>-->
        <a class="navbar-brand" href="/logout">
          <img src="/img/logout.png" alt="logout" style="height:40px;" >
        </a>
      </li>
    </ul>
    <span class="navbar-text mx-auto text-dark">
      <h4>${uname}님 반갑습니다</h4>
    </span>
    ${managementButton}
    <form class="form-inline" action="/bbs/search" method="POST">
      <input class="form-control mr-sm-2" type="text" name = "title" id = "title" placeholder="Search Title">
      <button class="btn btn-success" type="submit">Search</button>
    </form>
    
  </nav>
    `
  },
  top2: function (uname, uid) {
    return `
  <nav class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
    <!-- Brand/logo -->
    <a class="navbar-brand" href="#">
      <img src="/img/logo.jpg" alt="logo" style="height:40px;margin-left: 40px;margin-right: 50px;">
    </a>

    <!-- Links -->
    <ul class="nav mx-auto">
      <li class="nav-item">
        <h4><a class="nav-link ml-2 text-light" href="/bbs/list/1">홈</a></h4>
      </li>
      <li class="nav-item">
        <h4><a class="nav-link ml-2 text-light" href="/bbs/create">글쓰기</a></h4>
      </li>
      <li class="nav-item">
        <h4><a class="nav-link ml-2 text-light" href="/user/update/${uid}">개인정보 수정</a></h4>
      </li>
      <li class="nav-item">
        <h4><a class="nav-link ml-2 text-light" href="/logout" >로그아웃</a></h4>
      </li>
    </ul>
    <span class="navbar-text mx-auto text-light">
      <h4>${uname}님 반갑습니다</h4>
    </span>
    <a href="https://www.google.com/search?q=%EB%82%A0%EC%94%A8&oq=%EB%82%A0%EC%94%A8&aqs=chrome..69i57j0l5j69i61l2.2025j1j4&sourceid=chrome&ie=UTF-8"
      target="_black"><i class="fas fa-umbrella fa-5x float-right text-light"></i></a>
  </nav>
    `
  },
  footer: function () {
    return `
    <div class="navbar navbar-expand navbar-light bg-light fixed-bottom" height: 30px;">
      <div class="mx-auto" style="width:170px">Copyright 2017 by kitae</div>
      <a href="#top" class="badge badge-pill badge-primary float-right"></a>
    </div>
    `
  },
  loginForm: function (params) {
    return `<!DOCTYPE html>
    <html lang="ko">
    
    <head>
      <title>게시판</title>
      <title>Bootstrap Example</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
      
    </head>
    
    <body>
      <div class="row ">
        <div id="demo" class="carousel slide mx-auto" data-ride="carousel">
          <!-- Indicators -->
          <ul class="carousel-indicators">
            <li data-target="#demo" data-slide-to="0" class="active"></li>
            <li data-target="#demo" data-slide-to="1"></li>
            <li data-target="#demo" data-slide-to="2"></li>
          </ul>
          <!-- The slideshow -->
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="배경1.jpg" alt="배경1" width="1100" height="500">
            </div>
            <div class="carousel-item">
              <img src="배경2.jpg" alt="배경2" width="1100" height="500">
            </div>
            <div class="carousel-item">
              <img src="배경3.jpg" alt="배경3" width="1100" height="500">
            </div>
          </div>
    
          <!-- Left and right controls -->
          <a class="carousel-control-prev" href="#demo" data-slide="prev">
            <span class="carousel-control-prev-icon"></span>
          </a>
          <a class="carousel-control-next" href="#demo" data-slide="next">
            <span class="carousel-control-next-icon"></span>
          </a>
        </div>
      </div>
    </div>
      <div class="container p-5 my-3 ">
        <form action="/login" method="POST">
          <table class="mx-auto p-3">
            <tr>
              <td><label for="uid">사용자 ID</label></td>
              <td style="padding-left: 2%;"><input type="text" name="uid" id="uid" </td>
            </tr>
            <tr>
              <td><label for="pwd">패스워드</label></td>
              <td style="padding-left: 2%;"><input type="text" name="pwd" id="pwd"></td>
            </tr>
            <div>
              <td colspan="2" style="padding-left: 20%;">
                <input type="submit" class="btn btn-primary" value="로그인"></td>
                <td><button class="btn btn-secondary" value="회원가입" onclick = "location.href = '/user/register'">회원가입</button>
              </td>
          </table>
        </form>
      </div>
    </body>
    
    </html>`
  },
  t_head: function () {
    return `
    `;
  },
  pagination: function (pageNo, startPage, endPage, totalPage) {
    let leftPage = (pageNo > 10) ? `/bbs/list/${Math.floor(pageNo / 10) * 10}` : `/bbs/list/${startPage}` ;
    let pages = `<li class="page-item">
                    <a class="page-link active" href="${leftPage}" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span></a>
                </li>`;
    for (let page = startPage; page <= endPage; page++) {
      if (page === pageNo)
        pages += `
        <li class="page-item active" aria-current="page">
                        <span class="page-link">
                            ${page}<span class="sr-only">(current)</span>
                        </span>
                    </li>
        `;
      else
        pages += `
          <li class="page-item"><a class="page-link" href="/bbs/list/${page}">${page}</a></li>
          `;

    }
    let rightPage = (endPage < totalPage) ? `/bbs/list/${Math.ceil(pageNo / 10) * 10 + 1}` : `/bbs/list/${endPage}`;
    pages += `<li class="page-item">
                        <a class="page-link" href="${rightPage}" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span></a>
                    </li>`;
    return `   <ul class="pagination pagination-sm justify-content-center ">
    ${pages}
    <br>
    </ul>
    `;
  },
  createForm: function () {
    return `
    <body>
          <h1 class="text-center">추가</h1>
          <hr>
          <div class = "container mx-auto">
          <div class="row"></div>
          <div class="col-1"></div>
          <div class="col">
          <form action="/bbs/create" method="POST">
          <label for="title" class="text-center">글 제목</label>
          <input type="text" class="form-control form-control"
            style="width:100%;border:1;overflow:visible;text-overflow:ellipsis;"
            name="title" id="title">
          <label for="lyrics" class="text-center">내용</label>
          <textarea class="form-control"
            style="width:100%;height:100;border:1;overflow:visible;text-overflow:ellipsis;" rows=15
            name="content" id = "content"></textarea>
            <input type="submit" value="등록">
          </table>
        </form>
          
          </div>
          <div class="col-1"></div>
          
          </div>
        </body>
    `;
  },
  showBoard: function (results, uid) {
    let result = results[0];
    let txtBox = result.content
    let line = txtBox.replace(/(\n|\r\n)/g, '<br>');
    return `
    <div class="row">
    <div class="col-xs-2 col-md-2"></div>
    <div class="col-xs-9 col-md-9">
      <h2 class="text-center">게시글 보기</h2>
      <p>&nbsp;</p>
      <div class="table table-responsive">
        <table class="table">
          <tr>
            <th class="">글번호</th>
            <td>${result.bid}</td>
            <th class="">조회수</th>
            <td>${result.viewCount}</td>
          </tr>
          <tr>
            <th class="success">작성자</th>
            <td>${result.uid}</td>
            <th class="success">작성일</th>
            <td>${result.modTime}</td>
          </tr>
          <tr>
            <th class="success" colspan = "1">제목</th>
            <td colspan = "3">${result.title}</td>
          </tr>
          <tr>
            <th class="success text-center" colspan="4">글 내용</th>
            </tr>
            <tr>
            <td colspan="4" id = "result.content">${line}</td>
          </tr>
          <br>
          <tr>
            <td colspan="4" class="text-center">
              <input type="button" class="btn btn-light" value="수정하기" onclick="location.href='/bbs/update/${result.bid}/${result.uid}'">
              <input type="button" class="btn btn-light" value="삭제하기" onclick="location.href='/bbs/delete/${result.bid}/${result.uid}'">
              <input type="button" class="btn btn-light" value="목록보기" onclick="location.href='/bbs/list/1'">
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
    `;
  },
  updateForm: function (result, uid) {
    return `<body>
    <h1 class="text-center">수정</h1>
    <hr>
    <div class = "container mx-auto">
    <div class="row"></div>
    <div class="col-1"></div>
    <div class="col">
    <form action="/bbs/update/${uid}" method="POST">
    <input type="hidden"name="bid" value="${result.bid}">
    <input type="hidden"name="uid" value="${uid}">
    <label for="title" class="text-center">글 제목</label>
    <input type="text" class="form-control form-control"
    value ="${result.title}"
    name="title" id="title"
      style="width:100%;border:1;overflow:visible;text-overflow:ellipsis;
      >
    <label for="content" class="text-center">내용</label>
    <textarea class="form-control"
    value = "${result.content}"
      style="width:100%;height:100;border:1;overflow:visible;text-overflow:ellipsis;" rows=15
      name="content" id = "content">${result.content}</textarea>
      <input type="submit" value="등록">
    </table>
  </form> 
    
    </div>
    <div class="col-1"></div>
    
    </div>
  </body>`;
  },
  replyForm: function (html) {
    return `<div class="container">
    <form id="commentForm" name="commentForm" method="post">
    <br><br>
        <div>
            <div>
                <span><strong>Comments</strong></span> <span id="cCnt"></span>
            </div>
            <div>
                <table> 
                    ${html}
                    <tr>
                        <td>
                            <textarea style="width: 1100px" rows="3" cols="30" id="comment" name="comment" placeholder="댓글을 입력하세요"></textarea>
                            <br>
                            <div>
                                <input type="submit" value="등록"class="btn pull-right btn-success">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <input type="hidden" id="rid" name="rid" value="" >        
    </form>
</div>`
  },
  updateUserForm: function (result, uid) {
    return `
    <div class="container" style="margin-top: 90px;">  
    <div class="row">
        <div class="col-12">
            <h3>개인정보 수정</h3>
            <hr>
        </div>
        <div class="col-3"></div>
        <div class="col-6">
            <form action="/user/update" method="post">
                <table class="table table-borderless">
                    <tr>
                        <td><label for="uid">사용자 ID</label></td>
                        <td><input type="text" name="uid" id="uid" value = "${uid}"></td>
                    </tr>
                    <tr>
                        <td><label for="pwd">패스워드</label></td>
                        <td><input type="password" name="pwd" id="pwd"placeholder="비밀번호를 입력하세요"></td>
                    </tr>
                    <tr>
                        <td><label for="pwd2">패스워드 확인</label></td>
                        <td><input type="password" name="pwd2" id="pwd2"placeholder="비밀번호를 입력하세요"></td>
                    </tr>
                    <tr>
                        <td><label for="uname">이름</label></td>
                        <td><input type="text" name="uname" id="uname"value = "${result.uname}"></td>
                    </tr>
                    <tr>
                        <td><label for="email">email</label></td>
                        <td><input type="email" name="email" id="email"value = "${result.email}"></td>
                    </tr>
                    <tr>
                        <td><label for="tel">전화번호</label></td>
                        <td><input type="tel" name="tel" id="tel"value = "${result.tel}"></td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: center;">
                            <input class="btn btn-primary" type="submit" value="제출">
                            <button class="btn btn-secondary" value="취소" onclick = "location href = '/bbs/list/1'">취소</button>
                            <button class="btn btn-outline-danger float-right floating-button" onclick="location.href = '/user/delete'">탈퇴</button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="col-3">
        </div>
      </div>
    </div>
    `;
  },
  userInfoForm: function (result,uid) {
    return `
    <div class="row">
    <div class="col-xs-3 col-md-3"></div>
    <div class="col-xs-5 col-md-5 text-center">
      <h2 class="text-center">게시글 보기</h2>
      <p>&nbsp;</p>
      <div class="table table-responsive">
        <table class="table">
          <tr>
            <th class="">UID</th>
            <td>${result.uid}</td>
          </tr>
          <tr>
            <th class="success">이름</th>
            <td>${result.uname}</td>
          </tr>
          <tr>
            <th class="success">등록일</th>
            <td>${result.regTime}</td>
          </tr>
          <tr>
            <th class="success">Tel</th>
            <td>${result.tel}</td>
          </tr>
          <tr>
            <th class="success">E-MAIL</th>
            <td>${result.email}</td>
          </tr>
         
          <br>
          <tr>
            <td colspan="3" class="text-center">
              <input type="button" class="btn btn-light" value="탈퇴시키기" onclick="location.href='/user/delete/${uid}'">
              <input type="button" class="btn btn-light" value="목록보기" onclick="location.href='/user/management'">
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>`;
  }
}