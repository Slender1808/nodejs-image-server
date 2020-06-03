const http2 = require('http2')
const fs = require('fs')
const dirTree = require('./modules/dirTree.js')
const indexFile = require('./modules/indexFile.js')
const searchFile = require('./modules/searchFile.js')
const searchIndex = require('./modules/searchIndex.js')

var dir = dirTree('public')

var index = indexFile(dir)

//teste('/img/jpg-t.jpg', dir ,index)


var arrObj = searchIndex(dir, dir, index)

function searchReq(header, arrObj) {
  let arryHeaders = header.split("/")
  let req = arryHeaders.pop()


  let arrIndex = []
  let ind = 0
  for (let i = 0; i < arrObj.length; i++) {
    if (arrObj[i][req] != undefined) {
      arrIndex[ind] = arrObj[i][req]
      ind++
      break
    }
  }
  return arrIndex
}

console.log(arrObj)

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