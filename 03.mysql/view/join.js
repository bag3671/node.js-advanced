module.exports = {
  mainForm : function(rows){
    let tableRow = '';
    for (let row of rows) {
      tableRow += `
        <tr>
        <td>${row.hsid}</td>
        <td>${row.title}</td>
        <td>${row.name ? row.name :''}</td>
        <td>${row.lyrics}</td>
        <td>
        <a href ="/update/${row.hsid}">수정</a>
        <a href="/delete/${row.hsid}">삭제</a>
        </td>
        </tr>
              `;
    }
    return `
    <!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>노래 조회</title>
</head>
<body>
<style>
a {color:#4727d3}
</style>
<h3>노래 조회</h3>
<hr>
<table>
<tr>
  <th>hsid</th>
  <th>제목</th>
  <th>가수</th>
  <th>가사</th>
  <th>액션</th>

</tr>
${tableRow}
<tr><td><input type = "button" value = "추가"onclick = "location.href = '/insert'"></button></td></tr>
  </table>
  </body>
  </html>
    `
  },
  

}
