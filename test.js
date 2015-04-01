var express = require('express');
var app = express();

// 加载模板引擎hbs模块
var hbs = require('hbs');

//加载数据模块
var blogEngine = require('./blog');

//指定模板文件后缀名为html
app.set('view engine','html');
//运行hbs模块
app.engine('html',hbs.__express);
//设置静态资源路径
app.use(express.static('public'));
//路由模块
var router = express.Router();
router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();  
});
router.route("/")
	.get(function (req,res) {
		res.render('index',{title:"最新文章",entries:blogEngine.getBlogEntries()});
})
router.get('/about', function(req, res) {
    res.render('about',{title:"自我介绍"});
});

router.get('/article/:id', function(req, res) {
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render('article',{title:entry.title,blog:entry});
});
app.use('/', router);
app.listen(3000);