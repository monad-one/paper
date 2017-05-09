var express = require('express');
var app = express();
var path = require('path');
var fs = require("fs");

app.use(express.static(__dirname + '/public'));

app.get('/paper', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get('/comments', function(req, res) {
    var readable = fs.createReadStream(path.join(__dirname + '/public/comments.json'));
    readable.pipe(res);
})

var server = app.listen(8081, function() {

        var host = server.address().address
        var port = server.address().port

        console.log("Example app listening at http://%s:%s", host, port)

    })
    //webpack