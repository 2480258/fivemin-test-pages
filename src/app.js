var http = require('http');
var fs = require('fs');

var text = ""

fs.readFile("./public/performance-payload.txt", 'utf-8', function(err, data) {
    if (err) throw err;
    text = data
  });



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
        case '/referrerattributetest':
            console.log('sending... /referrerattributetest')
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write('<html><body><a href="/users" referrerpolicy="same-origin">users</a><a href="/abc" rel="noreferrer">abc</a></body></html>');
            res.end();
            break;

        case '/referrermetatest':
            console.log('sending... /referrermetatest')
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write('<html><head><meta name="referrer" content="origin"></head><body><a href="/users" referrerpolicy="origin">users</a></body></html>');
            res.end();
            break;

        case '/referrerheadertest':
            console.log('sending... /referrerheadertest')
            res.writeHead(200, { 'Content-Type': 'text/html', 'Referrer-Policy': 'no-referrer' })
            res.write('<html><body><a href="/users" referrerpolicy="origin">users</a></body></html>');
            res.end();
            break;

        case '/referrertest':
            console.log('sending... /referrertest')
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write('<html><body></body></html>');
            res.end();
            break;

        default:
            if (req.url.toString().substring(0, 12) == '/performance') {
                performance(req.url.toString(), res)
            }
            else {
                res.end()
            }


            break;
    }

}).listen(3000);

console.log('Navigate to http://localhost:3000/.');

function performance(fragment, res) {
    //a.com/performance/1
    //a.com/performance/1/1
    //a.com/performance/1/1/1

    console.log('performance testing: ' + fragment)
    len = fragment.substring(12).split('/').length

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.write('<html><body>')
    if (len > 3) {

    }
    else {
        for (var i = 0; i < 100; i++) {
            res.write(`<a href="${fragment}/${i}">${fragment}/${i}</a>`)
        }

    }
    res.write(text)
    res.write('</body></html>')
    res.end()
}