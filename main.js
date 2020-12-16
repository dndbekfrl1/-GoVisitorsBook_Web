const express = require("express");
const app = express();
const port = 3000;
const Config = require("./lib/config");
const axios = require("axios");

var expressSession = require("express-session");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);

/**
 * 매일 자정 14일이 넘어간 데이터는 보여주지 않음
 * 주기적으로 현재 시간이 자정인지 확인함
 * 서버단에서 실행됨
 */
// [] ajax로 작동확인ㅎ
// [V]작동확인
var today = new Date();
var hours = today.getHours();
var minutes = today.getMinutes();

function deleteAfter2Weeks() {
  console.log("execute!..");
  const txName = Config.txActionName.setOff.txName;
  const from = Config.walletAddress.from;
  const apiKey = Config.dapp.apiKey;

  var data = {
    from: `${from}`,
  };
  axios
    .post(`https://api.luniverse.io/tx/v1.1/transactions/${txName}`, data, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })
    .then(() => {
      console.log("2주 전의 데이터가 삭제되었습니다.");
    })
    .catch((err) => {
      console.log("error발생");
      console.log(err);
    });
}

if (hours === 0 && minutes >= 0 && minutes <= 10) {
  setInterval(deleteAfter2Weeks, 1000);
}
app.set("view engine", "ejs");
app.set("views", "./view");

app.get("/require", function (req, res) {
  res.render("require");
});

app.get("/", function (req, res, next) {
  if (req.session.userId == undefined) {
    res.redirect("/require");
    next();
  }
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
   * [V] term과 api 통신
   */
  res.render("search", {
    Config,
    searchtype,
    term,
  });
});

app.post("/login_process", (req, res) => {
  /**
   * 로그인, 비밀번호
   */
  var user = {
    username: "go-team",
    password: "pproject",
  };

  var uname = req.body.username;
  var pwd = req.body.password;

  if (uname === user.username && pwd === user.password) {
    req.session.userId = user.username;
    res.redirect("/");
  } else {
    res.redirect(301, "/require");
    res.send('<script type="text/javascript">alert("오류발생");</script>');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
