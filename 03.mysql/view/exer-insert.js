module.exports.insertForm = function(){
    return `
    <!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Song Form</title>
</head>

<body>
  <h1>추가</h1>
  <hr>
  <form action="/insert" method="POST">
    <table>
      <tr>
        <td><label for = "name">이름</label></td>
        <td><input type="text" name="name" id="name" </td>
      </tr>
      <tr>
        <td><label for = "debutday">데뷔날</label></td>
        <td><input type="text" name="debutday" id="debutday"></td>
      </tr>
      <td colspan="2"><input type="submit" value="제출"></td>
    </table>
  </form>
</body>

</html>
    `;
  }
