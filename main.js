const express = require("express");
const app = express();
const port = 3000;
const Config = require("./lib/config");
const axios = require("axios");

/**
 * 매일 자정 14일이 넘어간 데이터는 보여주지 않음
 * 주기적으로 현재 시간이 자정인지 확인함
 * 서버단에서 실행됨
 */

// []작동확인
// var isUpdated = false;
function deleteAfter2Weeks() {
  var today = new Date();
  var hours = today.getHours();
  var minutes = today.getMinutes();

  if (hours === 0 && minutes >= 0 && minutes <= 10) {
    var data = {
      from: `${Config.walletAddress.from}`,
    };
    axios
      .post(
        `https://api.luniverse.io/tx/v1.1/transactions/${Config.txActionName.setOff.txName}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Config.chainId}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        console.log("2주 전의 데이터가 삭제되었습니다.");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
setInterval(deleteAfter2Weeks(), 100000);

app.set("view engine", "ejs");
app.set("views", "./view");

app.get("/", function (req, res) {
  res.render("main", { Config });
});

app.get("/search", (req, res) => {
  console.log(req.query);
  var searchtype = req.query.searchtype;
  var term = req.query.term;
  /*
   * [V] 번호 검색, 상점 검색 select bar 생성
   * [V] 번호 검색, 상점 검색 검색 버튼 상호작용
   * [V] config 작성
   * [] term과 api 통신
   */
  res.render("search", {
    Config,
    searchtype,
    term,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
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
