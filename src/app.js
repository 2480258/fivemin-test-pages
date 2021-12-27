var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    console.log('received')
    switch (req.url) {
        case '/home':
            console.log('sending... /home')
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write('<html><body><div><img src = "/1.png"/><img src = "/2.png"/><img src = "/1.png"/></div> <a href="/users">users</a> <a href="/about">about</a><a href="/redirect">redirect</a></body></html>');
            res.end();
            break;
        case '/about':
            console.log('sending... /about')
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write('<html><body><h1>A1234567890<h1><h2>B1234567890<h2></body></html>')
            res.end();
            break;
        case '/redirect':
            console.log('sending... /redirect')
            res.writeHead(302, {
                'Location': '/about'
            });
            res.end()
            break;
        case '/users':
            console.log('sending... /users')
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write('<html><body><h1>C1234567890<h1><h2>D1234567890<h2></body></html>')
            res.end();
            break;

        case '/1.png':
            console.log('sending... /1.png')
            fs.readFile('./public/1.png', function (err, data) {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(data);
            })
            break;

        case '/2.png':
            console.log('sending... /2.png')
            fs.readFile('./public/2.png', function (err, data) {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(data);
            })
            break;

        default:
            res.end()
            break;
    }

}).listen(3000);

console.log('Navigate to http://localhost:3000/.');