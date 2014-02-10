require('https').get({ host: 'https://raw.github.com/tjanczuk/haiku-http/master/samples/haikus/mongo.js' }, function (bres) {
    res.writeHead(bres.statusCode)
    bres.pipe(res)
}).on('error', function (err) {
    res.writeHead(500)
    res.end('Error talking to backend: ' + err)
})