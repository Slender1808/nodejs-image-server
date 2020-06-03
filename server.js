const http2 = require('http2')
const fs = require('fs')
const dirTree = require('./modules/dirTree.js')
const indexFile = require('./modules/indexFile.js')
const searchFile = require('./modules/searchFile.js')

var dir = dirTree('public')

var index = indexFile(dir)

searchFile('/img/jpg-t.jpg', dir,index)

const server = http2.createSecureServer({
  key: fs.readFileSync('./localhost-privkey.pem'),
  cert: fs.readFileSync('./localhost-cert.pem')
})

server.on('stream', (stream, headers) => {
  // stream is a Duplex
  const res = searchFile(headers[":path"], dir, index)
  stream.respond({
    'content-type': 'image/' + res[1],
    ':status': 200
  });
  stream.end(res[0])
})
server.listen(8443)