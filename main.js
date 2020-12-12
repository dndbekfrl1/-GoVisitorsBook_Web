const express = require('express')
const app = express()
const port = 3000
var template = require('./template/lib.js');


app.set("view engine", "ejs");
app.set('views','./view');

app.get('/',function(req,res){
  res.render('view');
  //res.send(template.template+" "+template.header+" "+template.visit_list);
})



app.get('/search',(req,res)=>{
  console.log(req.query);
  var searchtype= req.query.searchtype;
  var term = req.query.term;
  /*
  * [V] 번호 검색, 상점 검색 select bar 생성  
  * [V] 번호 검색, 상점 검색 검색 버튼 상호작용
  * [] term과 api 통신
  */
  res.send(term+" "+searchtype);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
/*
const express = require('express') //모듈 로드 
const app = express()
const port = 3000

var fs = require('fs');
var template = require('./template/main.html');

//route, rounting: 사용자의 path에 응답을 해줌 
//경로, 경로가 호출됐을때 호출될 함수
app.get('/', (request, response) => {
  response.render('hello');
});

app.get('/page', (req, res) => {
    res.send('/page')
});

//3000포트로 listen 
//성공시   
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
*/