var mysql = require('../database/database');
var crypto = require('crypto');
var express = require('express');
var router = express.Router();



/* 登录页 */
router.get('/login', function (req, res, next) {
  res.render('login', {message: ''});
});

router.post('/login', function (req, res, next) {
    var name = req.body.name;
    var password = req.body.name;
    var hash = crypto.createHash('md5');
    hash.update(password);
    password = hash.digest('hex');
    var query = 'SELECT * FROM author WHERE authorName=' + mysql.escape(name) + ' AND authorPassword=' + mysql.escape(password);
    mysql.query(query, function (err, rows, fields) {
        if (err) {
            console.error(err);
            return;
        }
        var user = rows[0];
        if (user) {
            // 登录成功
            // console.log('req.sessioin', req.session)
            // req.session.userSign = true
            // req.session.userID = user.authorID;
            res.redirect('/');
        } else {
            // 登录失败
            res.render("login", {"code": 200, "message": "用户名或密码错误", "data": {}})
        }
    });
});

/* 首页 */
router.get('/', function (req, res, next) {
   var query = `select * FROM article`;
   mysql.query(query, function (err, rows, fields) {
       var articles = rows;
       articles.forEach(function (ele) {
          var year = ele.articleTime.getFullYear();
          var month = ele.articleTime.getMonth() + 1 < 10 ? "0" + (ele.articleTime.getMonth() + 1) : ele.articleTime.getMonth() + 1;
          var day = ele.articleTime.getDate();
          ele.articleTime = year + "-" + month + "-" + day;
       });
       res.render("index", { articles: articles});
   });
});

/* 文章内容 */
router.get('/articles/:articleID', function (req, res, next) {
   var articleID = req.params.articleID;
   var query = `SELECT * FROM article WHERE articleID = ${mysql.escape(articleID)}`;
   mysql.query(query, function (err, rows, fields) {
      if (err) {
          console.log(err);
          return;
      }
      var article = rows[0];
      var year = article.articleTime.getFullYear();
      var month = article.articleTime.getMonth() + 1 < 10 ? '0' + (article.articleTime.getMonth() + 1) : article.articleTime.getMonth() + 1;
      var day = article.articleTime.getDate() < 10 ?  '0' + (article.articleTime.getDate()) : article.articleTime.getDate();
      article.articleTime = year + '-' + month + '-' + day;
      res.render('article', {article: article});
   });
});
module.exports = router;
