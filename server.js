const http2 = require('http2')
const fs = require('fs')
const path = require('path')
let router = require('./routes');

var teste = []
teste.push({ img: fs.readFileSync(path.resolve(__dirname, 'jpg-t.jpg')) })
teste.push({ img: fs.readFileSync(path.resolve(__dirname, 'png-t.png')) })
teste.push({ img: fs.readFileSync(path.resolve(__dirname, 'webp-t.webp')) })

const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
});

server.on('stream', (stream, headers) => {
  console.log(headers[":path"]) // req
  if (headers[":path"] == '/png') {
    // stream is a Duplex
    stream.respond({
      'content-type': 'image/jpg',
      ':status': 200
    });
    console.log('PNG---')
    stream.end(teste[1].img);
  } else if (headers[":path"] == '/jpg') {
    stream.respond({
      'content-type': 'image/jpg',
      ':status': 200
    });
    console.log('JPG---')
    stream.end(teste[0].img);
  } else if (headers[":path"] == '/webp') {
    stream.respond({
      'content-type': 'image/webp',
      ':status': 200
    });
    console.log('WEBP---')
    stream.end(teste[2].img);
  } else {
    stream.respond({ ':status': 200 });
    stream.end('some data');
  }
});

server.listen(8443);

