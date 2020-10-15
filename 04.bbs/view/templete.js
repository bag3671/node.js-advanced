module.exports = {
  header2 : function () {
    return`
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
  
  header : function () {
    return`
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
  top : function(uname){
    return`
  <nav class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
    <!-- Brand/logo -->
    <a class="navbar-brand" href="#">
      <img src="img/logo.jpg" alt="logo" style="height:40px;margin-left: 40px;margin-right: 50px;">
    </a>

    <!-- Links -->
    <ul class="nav mx-auto">
      <li class="nav-item">
        <h4><a class="nav-link ml-2 text-light" href="/">홈</a></h4>
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
  top2 : function(uname){
    return`
  <nav class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
    <!-- Brand/logo -->
    <a class="navbar-brand" href="#">
      <img src="/04.bbs/public/img/logo.jpg" alt="logo" style="height:40px;margin-left: 40px;margin-right: 50px;">
    </a>

    <!-- Links -->
    <ul class="nav mx-auto">
      <li class="nav-item">
        <h4><a class="nav-link ml-2 text-light" href="/">홈</a></h4>
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
  footer : function () {
    return`
    <div class="navbar navbar-expand navbar-light bg-light fixed-bottom style=" height: 30px;">
      <div class="mx-auto" style="width:170px">Copyright 2017 by kitae</div>
      <a href="#top" class="badge badge-pill badge-primary float-right">탑으로</a>
    </div>
    `
  },
  loginForm:function (params) {
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
  t_head : function () {
    return`
    `;
  },
  pagination : function () {
    return `    <ul class="pagination pagination-sm justify-content-center ">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item"><a class="page-link" href="/">1</a></li>
    <li class="page-item"><a class="page-link" href="/2">2</a></li>
    <li class="page-item"><a class="page-link" href="/3">3</a></li>
    <li class="page-item"><a class="page-link" href="/4">4</a></li>
    <li class="page-item"><a class="page-link" href="/5">5</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
    <a href="/create" class="kboard-default-button-small">글쓰기</a>
`;
  },
  createForm : function () {
    return`
    <body>
          <h1 class="text-center">추가</h1>
          <hr>
          <div class = "container mx-auto">
          <div class="row"></div>
          <div class="col-1"></div>
          <div class="col">
          <form action="/create" method="POST">
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
  showBoard : function (results,uname) {
    let result = results[0];
    console.log(result);
    return`
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
            <td>${uname}</td>
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
            <td colspan="4">${result.content}</td>
          </tr>
          <br>
          <tr>
            <td colspan="4" class="text-center">
              <input type="button" class="btn btn-success" value="답글 쓰기" onclick="location.href='#'">
              <input type="button" class="btn btn-warning" value="수정하기" onclick="location.href='/bbs/update/${result.bid}'">
              <input type="button" class="btn btn-danger" value="삭제하기" onclick="location.href='#'">
              <input type="button" class="btn btn-primary" value="목록보기" onclick="location.href='/'">
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
    `;
  },
  updateForm : function (result) {
    return `<body>
    <h1 class="text-center">수정</h1>
    <hr>
    <div class = "container mx-auto">
    <div class="row"></div>
    <div class="col-1"></div>
    <div class="col">
    <form action="/bbs/update" method="POST">
    <<input type="hidden"name="bid" value="${result.bid}">
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
  replyForm : function (result,uname,existReply) {
    return`
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
            <td>${uname}</td>
            <th class="success">작성일</th>
            <td>${result.modTime}</td>
          </tr>
          <tr>
            <th class="success" colspan="1">제목</th>
            <td colspan="3">${result.title}</td>
          </tr>
          <tr>
            <th class="success text-center" colspan="4">글 내용</th>
          </tr>
          <tr>
            <td colspan="4">${result.content}</td>
          </tr>
          <tr>
            ${existReply}
          </tr>
            <tr>
            <form action="/bbs/${bid}" method="post">
              <th>댓글</th>
              <td><textarea name="reply" id="reply" cols="30" rows="10"></textarea></td>
            </form>
          </tr>
          <tr>
            <td colspan="4" class="text-center">
              <input type="button" class="btn btn-success" value="답글 쓰기" onclick="location.href='#'">
              <input type="button" class="btn btn-warning" value="수정하기"
                onclick="location.href='/bbs/update/${result.bid}'">
              <input type="button" class="btn btn-danger" value="삭제하기" onclick="location.href='#'">
              <input type="button" class="btn btn-primary" value="목록보기" onclick="location.href='/'">
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
    `
  }
}