module.exports.updateForm = function(result){
  return `
  <!DOCTYPE html>
<html lang="ko">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>사용자 관리</title>
</head>

<body>
<h1>사용자 정보 수정</h1>
<hr>
<form action="/update" method="POST">
<input type="hidden"name="uid" value="${result.uid}">
  <table>
    <tr>
      <td><label for = "pwd">패스워드</label></td>
      <td><input type="password" name="pwd" id="pwd"></td>
    </tr>
    <tr>
      <td><label for = "pwd2">패스워드 확인</label></td>
      <td><input type="password" name="pwd2" id="pwd2"></td>
    </tr>
    <td colspan="2"><input type="submit" value="제출"></td>
  </table>
</form>
</body>

</html>
  `;
}
