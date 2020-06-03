const http2 = require('http2')
const fs = require('fs')
const dirTree = require('./modules/dirTree.js')
const indexFile = require('./modules/indexFile.js')
const searchFile = require('./modules/searchFile.js')

var dir = dirTree('public')

var index = indexFile(dir)

searchFile('/img/png-t.png', dir ,index)

const server = http2.createSecureServer({
  key: fs.readFileSync('./localhost-privkey.pem'),
  cert: fs.readFileSync('./localhost-cert.pem')
})

server.on('stream', (stream, headers) => {
  // stream is a Duplex
  const res = searchFile(headers[":path"], dir, index)
  console.log(res.path)
  stream.respond({
    'content-type': 'image/jpg',
    ':status': 200
  });
  stream.end(res.byte)
})
server.listen(8443)