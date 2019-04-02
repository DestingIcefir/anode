var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

var index = require('./routes/index');
var users = require('./routes/users');
var apis = require('./routes/api');

var app = express();

// var nunjucksEnv = new nunjucks.Environment()

var cnodeTags = {
  'share': '分享',
  'ask': '问答',
  'job': '招聘',
  'good': '精华'
}

// view engine setup
var nunjucksEnv = nunjucks.configure('views', {
  autoescape: true,
  express: app
})
nunjucksEnv.addFilter('cnode_tag', function(topic) {
  if (topic.top) {
    return '精品'
  }
  return cnodeTags[topic.tab]
})

nunjucksEnv.addFilter('last_reply_time', function(time) {
  console.log('in ', time)
  var date = Date.parse(time)
  var now = Date.now()
  var t = now - date
  var days = Math.round(t / (1000 *60 * 60 * 24))
  var hours = Math.round(t / (1000 *60 * 60))
  var minutes = Math.round(t / (1000 * 60))
  var seconds = Math.round(t / 1000)
  console.log(hours, minutes, seconds)
  if (seconds < 60) {
    return seconds + '秒内'
  }
  if (minutes < 60) {
    return minutes + '分钟内'
  }
  if (hours < 24) {
    return hours + '小时内'
  }
  if (days < 7) {
    return days + '天内'
  }
  date = new Date(date)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

})
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(session({
  maxAge: 1000 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'I will teach you'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/api', apis);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err)

  // render the error page
  res.status(err.status || 500);
  res.render('error.njk', err.msg);
});

module.exports = app;
