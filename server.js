// var express = require('express')
// var app = express()
// var routes = require('./routes')(app);
// app.use(express.static(__dirname + '/public'));

// app.listen(3000,'127.0.0.1', function () {
//   var host = this.address().address
//   var port = this.address().port

//   console.log('Example app listening at http://%s:%s', host, port)
// })

var express = require("express");
var http = require("http");
var app = express();

app.all("*", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  next();
});

app.get("/", function(request, response) {
  response.end("Welcome to the homepage!");
});

app.get("/about", function(request, response) {
  response.end("Welcome to the about page!");
});

app.get('/hello/:who?',function(req,res) {
    if(req.params.id) {
        res.end("Hello, " + req.params.who + ".");
    }
    else {
        res.end("Hello, Guest.");
    }
});

app.get("*", function(request, response) {
  response.end("404!");
});

http.createServer(app).listen(1337);