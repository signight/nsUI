module.exports = function(app) {

    app.all("*", function(request, response, next) {
        response.writeHead(200, {
            "Content-Type": "text/plain"
        });
        res.sendfile('../views/index.html');
        next();
    });

    app.get("/", function(request, response) {
        response.end("Welcome to the homepage!");
    });

    app.get("/about", function(request, response) {
        response.end("Welcome to the about page!");
    });

    app.get('/hello/:who?', function(req, res) {
        if (req.params.id) {
            res.end("Hello, " + req.params.who + ".");
        } else {
            res.end("Hello, Guest.");
        }
    });
   
    app.get("*", function(request, response) {
        response.end("404!");
    });
}
