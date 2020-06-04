const http2 = require('http2')
const fs = require('fs')
const dirTree = require('./modules/dirTree.js')
const searchFile = require('./modules/searchFile.js')
const searchReq = require('./modules/searchReq.js')

var dir = dirTree('public')
console.log(searchFile.indexFile(dir))
console.log('           ')
var arrObj = searchFile.searchIndex(dir, dir, searchFile.indexFile(dir))

const server = http2.createSecureServer({
  key: fs.readFileSync('./localhost-privkey.pem'),
  cert: fs.readFileSync('./localhost-cert.pem')
})

server.on('stream', (stream, headers) => {
  // stream is a Duplex

  const res = eval(searchReq(headers[":path"], arrObj)[0])

  stream.respond({
    'content-type': 'image/jpg',
    ':status': 200
  });
  stream.end(res.byte)
})
server.listen(8443)