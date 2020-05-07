const http2 = require('http2');
const fs = require('fs');
const path = require('path')

var img = []
img.push({ testeJPG: fs.readFileSync(path.resolve(__dirname, 'jpg-t.jpg')) })

const server = http2.createSecureServer({
    key: fs.readFileSync('localhost-privkey.pem'),
    cert: fs.readFileSync('localhost-cert.pem')
});
server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
    // stream is a Duplex
    stream.respond({
        'content-type': 'image/jpg',
        ':status': 200
    });
    console.log('testeJPG')
    console.log(img)
    stream.end(img[0].testeJPG);
});

server.listen(8443);