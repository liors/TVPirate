var express = require('express');
var app = express();

var tvDB    = require("thetvdb-api"),
    key     = "1E5533B11B69322E";


app.get('/show', function(req, res){
    tvDB(key).getSeries(req.query.keyword, function(err, response) {
        if (!err) {
            res.send(response.Data);
        }
    });
});

app.get('/episodes', function(req, res){
    tvDB(key).getSeriesAllById(req.query.show, function(err, response) {
        if (!err) {
            res.send(response.Data);
        }
    });
});

app.get("/", function(req, res) {
    res.redirect("/index.html");
});


app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/app'));
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
    app.use(app.router);
});

app.listen(3000);
console.log('Listening on port 3000');