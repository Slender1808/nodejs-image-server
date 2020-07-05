const http2 = require('http2')
const fs = require('fs')
const dirTree = require('./modules/dirTree')

var dir = dirTree('public')

const routes = require('./server/routes')

const server = http2.createSecureServer({
  key: fs.readFileSync('./localhost-privkey.pem'),
  cert: fs.readFileSync('./localhost-cert.pem')
})

server.on('stream', (stream, headers) => {
  // stream is a Duplex
  let res = routes(headers[":path"],dir)
  console.log(res)

  stream.respond({
    'content-type': res.contentType,
    ':status': res.status
  });
  stream.end(res.byte)
})
server.listen(8443)