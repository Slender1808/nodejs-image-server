const http2 = require('http2')
const fs = require('fs')
const dirTree = require('./teste')

var dir = dirTree('public')

const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
})

server.on('stream', (stream, headers) => {
  function indexImg(header) {
    var reqHeaders = header.split("/")
    if (reqHeaders.length > 2) {
      console.log('>1')
      var aaa = 'dir.children'
      for (let i = 0; i < reqHeaders.length; i++) {
        var r = aaa + '.findIndex(obj => obj.name == reqHeaders[' + i + '])'
        var b = eval(r)
        if (b >= 0) {
          if (i == reqHeaders.length - 1) {
            aaa = aaa + '[' + b + ']'
          } else {
            aaa = aaa + '[' + b + '].children'
          }
        }
      }
      return eval(aaa + '.byte')
    } else {
      var i = dir.children.findIndex(obj => obj.name == reqHeaders[1])
      return dir.children[i].byte
    }
  }

  // stream is a Duplex
  stream.respond({
    'content-type': 'image/jpg',
    ':status': 200
  });
  //console.log('index ' + index)
  stream.end(indexImg(headers[":path"]));
});
server.listen(8443)