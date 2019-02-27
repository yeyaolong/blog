var mysql = require('../database/database');
var crypto = require('crypto');
var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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
    // var query = `SELECT * FROM author WHERE authorName=  ${name} AND authorPassword= ${password}`
    console.log(query);
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

module.exports = router;
