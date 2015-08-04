##框架

主要结构以LESS预编译为依托。主要结构遵守响应式布局结构。

###总体结构

各功能模块大概写在以下注释里了。
<<<<<<< HEAD
｀｀｀
=======

```
>>>>>>> 5136b7bb58ff8151351672dcb3399a3886a1c64c
nsUI/
├── build/                            //编译生成的文件，为开放环境所用
│   └── css                           //编译生成的CSS文件夹
│   │   ├── main.css                  //未压缩方便调试
│   │   └── main.css.map              //css的map地图
│   ├── js/                           //编译生成的JS文件，未压缩方便调试
│   │   ├── main.js                   //js的入口文件
│   │   ├── common.js                 //公共方法文件
│   │   ├── lib/                      //从source那里复制过来库文件
│   │   │    ├── jquery.min.js        //jquery框架
│   │   │    ├── mock.min.js          //生成模拟数据文件  
│   │   │    │                        //参考文献地址：http://mockjs.com/
│   │   │    ├── require.min.js       //AMD模式JS加载器 :http://requirejs.org/
│   │   │    ├── text.js              //AMD模式模版文件解析器
│   │   │    └── underscore.js        //underscore微模版 
│   │   │                             //文献http://www.css88.com/doc/underscore/
│   │   ├── vender/                   //插件文件夹
│   │   │    ├── echarts.js           //以下展示用，非标准
│   │   │    ├── mock.min.js
│   │   │    ├── require.min.js
│   │   │    ├── text.js
│   │   │    └── underscore.js
│   │   ├── models/                    //模块文件夹
│   │   │    ├── app/      
│   │   │    │    ├── ...js
│   │   │    │    ├── ...js
│   │   │    │    ├── ...js
│   │   │    │    └── ...js
│   │   │    ├── app2/      
│   │   │         ├── ...js
│   │   │         └── ...js
│   │   ├── collections/               //集合文件夹
│   │   │    ├── app/      
│   │   │    │    ├── ...js
│   │   │    │    ├── ...js
│   │   │    │    ├── ...js
│   │   │    │    └── ...js
│   │   │    ├── app2/      
│   │   │         ├── ...js
│   │   │         └── ...js
│   │   ├── views/                     //视图文件夹
│   │   │    ├── app/      
│   │   │    │    ├── ...js
│   │   │    │    ├── ...js
│   │   │    │    ├── ...js
│   │   │    │    └── ...js
│   │   │    ├── app2/      
│   │   │         ├── ...js
│   │   │         └── ...js
│   │   ├── routers/                   //功能路由文件夹
│   │   │    ├── app/      
│   │   │    │    ├── ...js
│   │   │    │    ├── ...js
│   │   │    │    ├── ...js
│   │   │    │    └── ...js
│   │   │    ├── app2/      
│   │   │         ├── ...js
│   │   │         └── ...js
│   │   └── app/                       //各业务模块JS文件夹              
│   │        ├── app1/../.      
│   │        ├── app2/../. 
│   │        └── app3/../. 
│   └── img/                           //图片文件夹，从source处自动复制过来的
│        ├── ...jpg
│        ├── ...png
│        └── ...gif 
├── dist/                              //经过压缩后测试环境文件
│   └── css
│   │   └── main.min.css
│   ├── js/
│   │   ├── lib/
│   │   │    ├── jquery.min.js        
│   │   │    ├── mock.min.js
│   │   │    ├── require.min.js
│   │   │    ├── text.js
│   │   │    └── underscore.js
│   │   ├── vender/
│   │   │    ├── echarts.js        
│   │   │    ├── mock.min.js
│   │   │    ├── require.min.js
│   │   │    ├── text.js
│   │   │    └── underscore.js
│   │   ├── .../
│   │   ├── .../
│   ├── .../
│   
├── public/                              //生产环境引入文件地址，乃dist文件最终版本
│    ├── ../.      
│    ├── ../.     
│  
├── node_modules/                        //开发环境引入的node包，不作为交付标准
│    ├── app/      
│    └── app2/     
│ 
├── sources/                                //源文件
│    ├── js/../.  
│    │    ├── api/                          //模拟数据地址，为各模块提供模拟数据
│    │    │    ├── app/      
│    │    │    │    ├── ...js
│    │    │    │    ├── ...js
│    │    │    │    ├── ...js
│    │    │    │    └── ...js
│    │    │    ├── app2/      
│    │    │    │    ├── ...js
│    │    │    │    └── ...js    
│    ├── less/../.                           //css源文件的LESS版本
│    └── sass/../.                           //css源文件的SASS版本
│
├── fonts/                                   //字符文件
│   ├── glyphicons-halflings-regular.eot
│   ├── glyphicons-halflings-regular.svg
│   ├── glyphicons-halflings-regular.ttf
│   ├── glyphicons-halflings-regular.woff
│   └── glyphicons-halflings-regular.woff2
├── index.html                                //主文件入口
├── html.html                                 //静态模块展示页面
├── Gruntfile.js                              //自动化生成脚本文件
├── package.json                              //包管理文件
├── favicon.ico                               //站点图标
└── readme.MD                                 //本文件
```

### CSS模块

CSS 由 设计稿提供 各元件参数，但是必须要求元件按照模块来设计定稿。规格不统一无法生成元件。
响应式布局由@media查询来提供支持。但是对IE版本有要求。不支持IE8-。

CSS参数的设定在LESS／variables.less 内设置
类似
```
//颜色
@gray-base:                 #000;
@gray-darker:               lighten(@gray-base, 13.5%); // #222
@gray-dark:                 lighten(@gray-base, 20%);   // #333
@gray:                      lighten(@gray-base, 33.5%); // #555
@gray-light:                lighten(@gray-base, 46.7%); // #777
@gray-lighter:              lighten(@gray-base, 93.5%); // #eee

@brand-primary:             darken(#428bca, 6.5%); // #337ab7
@brand-success:             #5cb85c;
@brand-info:                #5bc0de;
@brand-warning:             #f0ad4e;
@brand-danger:              #d9534f;
```
#### 模块展示
静态文件模块展示文件为根目录下 html.html

### JS模块

JS由require提供AMD加载器来提供加载规范。JS入口为js/main.js文件。相关依赖关系如下所示

main.js文件  

```
'use strict';
require.config({
    paths:{
        jquery: 'lib/jquery.min',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone-min',
        backboneLocalstorage: 'lib/backbone.localStorage-min',
        text: 'lib/text',
        ztree:'vendor/zTree/jquery.ztree.core-3.5',
        mock:'lib/mock-min'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        backboneLocalstorage: {
            deps: ['backbone'],
            exports: 'Store'
        }
    }
});
require(["jquery","views/app",'dataTree'],function ($) {
})
```
app.js

```
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/sidebar',
    'views/sidebar'
],function ($,_,Backbone,SidebarCollection,SideBarItemView){
    var sidebarView = Backbone.View.extend({
        el:$("#sidebar"),
        initialize:function () {
            this.listenTo(SidebarCollection,'reset',this.render);
            SidebarCollection.fetch({
                reset:true,
                success:function (collection,resp) {
                    console.log("<------------请求发送成功----------->");
                    for (var i = 0; i < collection.models.length; i++) {
                        console.log(collection.models[i].toJSON());
                    };
                    console.log("<------------请求发送结束----------->");
                }
            });
            this.collection = SidebarCollection;
        },
        render:function () {
            this.collection.forEach(function(item) {
               this.append(item);
            },this);
        },
        append:function (item) {
            var sideBarItemView = new SideBarItemView({model:item});
            this.$el.append(sideBarItemView.render().el);
        }
    })
    return new sidebarView();
})
```

#### 模拟数据 mock.js

具体示范为根目录下的mock.html和mockData.html

参考文献地址：http://mockjs.com/
