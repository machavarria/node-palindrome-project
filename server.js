const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');


const server = http.createServer(function(req, res) {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);

    if(page === '/'){
        fs.readFile('index.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }else if (page === '/js/client.js'){
        fs.readFile('js/client.js', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
        });

    }else if (page === '/style.css') {
        fs.readFile('style.css', function(err, data) {
          res.writeHead(200, {'Content-Type': 'text/css'})
          res.write(data)
          res.end()
        });

    }
    else if (page === '/api'){
        if('word' in params){
            const userInput = params['word']
            const reversedWord = userInput.split('').reverse().join('')
            let result;

            if (userInput === reversedWord){
                result = `${userInput} is a Palindrome!`
            }else {
                result = `${userInput} is not a Palindrome!`
            }

            const objToJson = {
                results: result
            }
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(objToJson))
        }

        
    }else{
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.end('404 not found.')
    }
})

server.listen((3000), () => {
     console.log('Server is running on 3000')
})