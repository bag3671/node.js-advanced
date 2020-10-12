module.exports.updateForm = function(result){
  //console.log(result);
  return `
  <!DOCTYPE html>
<html lang="ko">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Song Form</title>
</head>

<body>
<h1>수정</h1>
<hr>
<form action="/update" method="POST">
<input type="hidden"name="ggid" value="${result.ggid}">
  <table>
    <tr>
      <td><label for = "name">노래 제목</label></td>
      <td><input type="text" name="name" id="name" value = "${result.name}"></td>
    </tr>
    <tr>
      <td><label for = "debut">데뷔날</label></td>
      <td><input type="text" name="debut" id="debut" value = "${result.debutday}"></td>
    </tr>
    <td colspan="2"><input type="submit" value="제출"></td>
  </table>
</form>
</body>

</html>
  `;
}
