var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    switch (req.url) {
        case '/home':
            console.log('sending... /home')
            res.writeHead(200, {'Content-Type' : 'text/html'})
            res.write('<html><body><div><img src = "this_is_test_image.png"/><img src = "this_is_test_image.png"/><img src = "this_is_test_image.png"/></div></body></html>');
            res.end();
            break;
        case '/about':
            console.log('sending... /about')
            res.writeHead(200, {'Content-Type' : 'text/html'})
            res.write('<html><body><h1>A1234567890<h1><h2>B1234567890<h2></body></html>')
            res.end();
            break;
        case '/redirect':
            console.log('sending... /redirect')
            res.writeHead(302, {
                'Location':'/about'
            });
            res.end()
            break;
        case '/users':
            console.log('sending... /users')
            res.writeHead(200, {'Content-Type' : 'text/html'})
            res.write('<html><body><h1>C1234567890<h1><h2>D1234567890<h2></body></html>')
            res.end();
            break;

        case '/this_is_test_image.png':
            console.log('sending... /this_is_test_image.png')
            fs.readFile('./public/this_is_test_image.png', function(err, data) {
                if(err) throw err;
                res.writeHead(200, {'Content-Type': 'image/png'});
                res.end(data);
            })
            break;
    }
    
}).listen(8080);

console.log('Navigate to http://localhost:8080/.');