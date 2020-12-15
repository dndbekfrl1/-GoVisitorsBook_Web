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
setInterval(deleteAfter2Weeks, 100000);

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



app.get("/login", function (req, res) {
  res.render("login");
});


// 로그인 구현 부분 test 


var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var cookieSession = require('cookie-session');
var flash = require('connect-flash');
const { mainModule } = require("process");

app.use(cookieSession({
  keys: ['p_project'],
  cookie:{
    maxAge:1000*60*60 //1시간 후 로그인 만료
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//라우터 설정

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

app.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}), // 인증 실패 시 401 리턴, {} -> 인증 스트레티지
  function (req, res) {
    res.redirect('/');
  });

  //localStrategy

  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true //인증을 수행하는 인증 함수로 HTTP request를 그대로  전달할지 여부를 결정한다
  }, function (req, username, password, done) {
    if(username === 'go-team' && password === 'pproject'){
      return done(null, {
        'user_id': username,
      });
    }else{
      return done(false, null)
    }
  }));

  //serializeUser

  passport.serializeUser(function(user,done){
      done(null,user)
  });

  //deserializeUse

  passport.deserializeUser(function(user, done) {
      done(null,user);
  });

  //isAuthenticated()

  var isAuthenticated = function(req, res, next) {
      if (req.isAuthenticated())
      return next();
      res.redirect('/login');
  };

//로그아웃

 app.get('/logout', function(req, res) {
     req.logout();
     res.redirect('/login');
 });