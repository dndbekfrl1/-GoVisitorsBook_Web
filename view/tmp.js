var Config = require("../lib/config");
var axios = require("axios");

//[]html로 res
//[V]Config파일 유용성있게 재작성
//[]매일 자정 14일이 넘어간 데이터는 보여주지 않는다
function deleteAfter2Weeks() {}
//[V]저장된 데이터 수
function getTotalNum() {
  var data = {
    from: `${Config.walletAddress.from}`,
  };
  axios
    .post(
      `https://api.luniverse.io/tx/v1.1/transactions/${Config.txActionName.viewLogNum.txName}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Config.dapp.apiKey}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => {
      var total = data.data.data.res[0];
      //리스트 함수 호출
      getList(total);
    })
    .catch((err) => {
      console.log(err);
    });
}
//[V]total까지 저장된 리스트를 보여준다
function getList(total) {
  for (var i = 0; i < total; i++) {
    var data = {
      from: `${Config.walletAddress.from}`,
      inputs: {
        index: i,
      },
    };
    axios
      .post(
        `https://api.luniverse.io/tx/v1.1/transactions/${Config.txActionName.viewLog.txName}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Config.dapp.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        var item = data.data.data.res;
        var data = item[0];
        var name = data[0];
        var pnum = data[1];
        var shop = data[2];
        var addr = data[3];
        var time = data[4] * 1000;
        var date = new Date(time);
        var img = data[5];
        var match = data[6];

        // $(".shop").html(shop);
        // $("#date").html(date);
        console.log(name + " " + shop + " " + pnum + " " + addr + " " + time);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
getTotalNum();
