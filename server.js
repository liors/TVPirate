var express = require('express');
var path = require('path');
var app = express();

var tvDB    = require("thetvdb-api"),
    key     = "1E5533B11B69322E";


app.get('/show', function(req, res){
    console.log(req.query.keyword);
    tvDB(key).getSeries(req.query.keyword, function(err, response) {
        if (!err) {
            res.send(response.Data);
        } else {
            console.log(err);
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

app.get('/PB', function(req, res){
    var request = require('request'),
    jsdom = require('jsdom');

    var options = {
        url: 'http://pirateshit.com/search/' + encodeURIComponent(req.query.keyword) + '+720p/0/7/0',
        headers: {
            'User-Agent': 'Googlebot'
        }
    };
    request(options, function (error, response, body) {
    if (error && response.statusCode !== 200) {
            console.log('Error when contacting thepiratebay.se')
        }
        jsdom.env({
            html: body,
            scripts: ["http://code.jquery.com/jquery.js"],
            done: function (errors, window) {
                var $ = window.$;
                var $rows = $('#searchResult').find("tr:gt(0)");
                var maxResults = $rows.length;
                var out = [];
                if ($rows && $rows.length > 0) {
                    for (var i = 0; i < maxResults; i++) {
                        out.push({
                            releasename: $($rows[i]).find('td:nth-child(2) > div ').text(),
                            magnetlink: $($rows[i]).find('td:nth-child(2)').find('a:eq(1)').attr('href'),
                            seeders: $($rows[i]).find("td:nth-child(3)").html(),
                            leechers: $($rows[i]).find("td:nth-child(4)").html()
                        });
                    }
                }
                res.send({results: out})
            }
        });
    });
});

app.get("/1", function(req, res) {
    res.redirect("/index.html");
});

app.get('/', function(req, res){
    res.render('index');
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
}));


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});