const mysql = require('mysql');
const fs = require('fs');
let info = fs.readFileSync('./mysql.json', 'utf8');
let connInfo = JSON.parse(info);
let conn = mysql.createConnection({
  host: connInfo.host,
  user: connInfo.user,
  password: connInfo.password,
  database: connInfo.database,
  port: connInfo.port
});

conn.connect();

// 1번문제
/* let sql = `
SELECT NAME,date_format(debut, '%Y-%m-%d') as debutdate FROM girl_group
	WHERE debut BETWEEN '2009-01-01' AND '2009-12-31'
  ORDER BY debut;
`;
conn.query(sql, (error, rows, fields) => {
  if (error) {
    console.log(error);
  }
  for (let row of rows) {
    console.log(row.NAME, row.debutdate);
  }
}); */

// 2번문제
/* let sql = `
SELECT l.NAME as name, date_format(l.debut, '%Y-%m-%d') as debutdate, r.title as title FROM girl_group AS l
	JOIN song AS r
	ON hsid = hit_song_id
	WHERE debut BETWEEN '2009-01-01' AND '2009-12-31';
`;
conn.query(sql, (error, rows, fields) => {
  if (error) {
    console.log(error);
  }
  for (let row of rows) {
    console.log(row.name, row.debutdate, row.title);
  }
}); */

// 3번문제
/* let sql = `
SELECT continent, COUNT(*) AS '국가수', 
round(SUM(gnp)) AS 'GNP합', round(AVG(gnp))	AS  'GNP평균'FROM country
GROUP BY continent
ORDER BY SUM(gnp) desc ;
`;
conn.query(sql, (error, rows, fields) => {
  if (error) {
    console.log(error);
  }
  for (let row of rows) {
    console.log(row.continent, row.국가수, row.GNP합, row.GNP평균);
  }
}); */

// 4번문제
/* let sql = `
SELECT country.continent as continent, country.NAME as countryName, city.name as cityName, city.population as cityPopulation FROM country
	JOIN city ON CODE = countrycode
	WHERE continent LIKE 'asia'
	ORDER BY cityPopulation desc
	LIMIT 10;
`;
conn.query(sql, (error, rows, fields) => {
  if (error) {
    console.log(error);
  }
  for (let row of rows) {
    console.log(row.continent, row.countryName, row.cityName, row.cityPopulation);
  }
}); */

// 5번문제
let sql = `
SELECT city.NAME AS cityName, city.Population AS cityPopulation, countrylanguage.Language AS Lan FROM city
	JOIN countrylanguage ON city.countrycode = countrylanguage.CountryCode
	WHERE isofficial = 'T'
	GROUP BY cityName
	ORDER BY cityPopulation desc
	LIMIT 10;
`;
conn.query(sql, (error, rows, fields) => {
  if (error) {
    console.log(error);
  }
  for (let row of rows) {
    console.log(row.cityName, row.cityPopulation, row.Lan);
  }
});

conn.end();