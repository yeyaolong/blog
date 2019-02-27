const DB_URL = 'mongodb://localhost:27017/mongoosesample';

var mongoose = require('mongoose');

/*  连接*/
mongoose.connect(DB_URL);

/* 连接成功 */
mongoose.connection.on('connected', function () {
   console.log('Mongoose connection open to');
});