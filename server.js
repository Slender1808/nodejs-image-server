const http2 = require('http2')
const fs = require('fs')
const dirTree = require('./dirTree.js')
const indexImg = require('./indexImg.min.js')

var dir = dirTree('public')


const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
})

server.on('stream', (stream, headers) => {
  // stream is a Duplex
  stream.respond({
    'content-type': 'image/jpg',
    ':status': 200
  });
  stream.end(indexImg(headers[":path"], dir));
});
server.listen(8443)