//引入express框架
var express = require('express');
//引入path模块，用来做路径代理 
var path = require('path');
//引入网站标识模块
var favicon = require('serve-favicon');
//
var logger = require('morgan');
//引入cookie分析模块
var cookieParser = require('cookie-parser');
//对请求内容进行解析，支持json、 application/x-www-form-urlencoded、multipart/form-data 格式数据的解析。
//也就是说ajax和form发送请求时，都会经过它的处理，方便在req中获取相应的请求值。
//在express中处理文件上传也是用它，可以给出参数指明上传文件存放的路径
var bodyParser = require('body-parser');
//引入路由表
var routes = require('./routes/index');
var users = require('./routes/users');
// 加载模板引擎hbs模块替换jade，需要npm 安装 hbs
// var hbs = require('hbs');
//启动express服务
var app = express();

//启动模板引擎hbs模块
//app.engine('html',hbs.__express);
// 模板路径设置
app.set('views', path.join(__dirname, 'views'));
//设置需要模板引擎渲染的文件类型是.jade的，可自定义为任何后缀名比如hbs
app.set('view engine', 'jade');

// 设置网站标识
app.use(favicon(__dirname + '/public/favicon.ico'));
//引入中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//设置静态资源路径
app.use(express.static(path.join(__dirname, 'public')));

//路由表挂载到'/'和'/users'下
app.use('/', routes);
app.use('/users', users);

// 捕获404错误及反馈
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
