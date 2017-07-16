var express = require('express');
var path = require('path');

var app = express();

app.use('/file', express.static('build'));

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.listen(8080, function() {
    console.log('server is running on 8080 port');
});
