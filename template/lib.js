const { isString } = require("util");
const template = {
      template: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
          <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
      </head>
      `,
      header: `
      <h1 class="text text-center">Go Visitor's Book</h1>
      <nav class="navbar navbar-light bg-light" style="margin-top: 50px;">

      <a class="navbar-brand" href="#">최근 방문 기록</a>
      <form method="get" id="searchForm" class="form-inline my-2 my-lg-0" action="/search">
      <input class="form-control mr-sm-2 search" type="search" name="term" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
    </form>
    <select name="searchtype" form="searchForm" data-style="btn-inverse" class="selectpicker" required>
        <option value="" selected disabled hidden >선택해주세요.</option>
        <option value="pnum">번호 검색</option>
        <option value="shop">상점 검색</option>
    </select>


      </nav>
      `,
      visit_list: `
      <table class="table table-hover table-striped text-center" style="border: 1px solid; margin-top: 30px;">
      <thead>
        <tr>
          <th>번호</th>
          <th>상호명</th>
          <th>갱신 시간</th>

        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>한신 포차</td>
          <td>2020-12-03/19:20</td>
        </tr>
      </tbody>
      </table>`,
}
module.exports = template;

