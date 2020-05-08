const http2 = require('http2')
const fs = require('fs')
const path = require('path')
const routes = require('./routes');

var teste = []
teste.push({ img: fs.readFileSync(path.resolve(__dirname, 'semfoto.webp')), name: 'semfoto', type: 'webp'})
teste.push({ img: fs.readFileSync(path.resolve(__dirname, 'jpg-t.jpg')), name: 'jpg', type: 'jpg' })
teste.push({ img: fs.readFileSync(path.resolve(__dirname, 'png-t.png')), name: 'png', type: 'png' })
teste.push({ img: fs.readFileSync(path.resolve(__dirname, 'webp-t.webp')), name: 'webp', type: 'webp' })

//path.extname(path.resolve(__dirname, 'semfoto.webp'))


const server = http2.createSecureServer({
   key: fs.readFileSync('localhost-privkey.pem'),
   cert: fs.readFileSync('localhost-cert.pem')
});

server.on('stream', (stream, headers) => {
   console.log(headers[":path"]) // req
   function indexImg(header) {
      const reqHeaders = header.split("/")
      if (reqHeaders[1] != undefined) {
         const ind = teste.findIndex(obj => obj.name == reqHeaders[1])
         if (ind != -1) {
            return ind
         }
      }
      return 0
   }
   const index = indexImg(headers[":path"])
   // stream is a Duplex
   stream.respond({
      'content-type': 'image/' + teste[index].type,
      ':status': 200
   });
   console.log('index ' + index)
   stream.end(teste[index].img);
});
server.listen(8443);

