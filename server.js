const http2 = require('http2')
const fs = require('fs')
const dirTree = require('./modules/dirTree')
const indexImg = require('./modules/indexImg')

var dir = dirTree('public')

const server = http2.createSecureServer({
  key: fs.readFileSync('./localhost-privkey.pem'),
  cert: fs.readFileSync('./localhost-cert.pem')
})

server.on('stream', (stream, headers) => {
  // stream is a Duplex
  const res = indexImg(headers[":path"], dir)
  stream.respond({
    'content-type': 'image/' + res[1],
    ':status': 200
  });
  stream.end(res[0])
})
server.listen(8443)