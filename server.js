const http2 = require('http2');
const {
  readFileSync,
  openSync,
  fstatSync,
  closeSync
} = require('fs');
const {
  resolve,
  extname
} = require('path');

let env
if (!process.env.KEY) {
  env = require('./env.js')
}

const server = http2.createSecureServer({
  key: readFileSync(`./ssl/${process.env.KEY || env.KEY}`),
  cert: readFileSync(`./ssl/${process.env.CRT || env.CRT}`),
  ca: [
    readFileSync(`./ssl/${process.env.CRT1 || env.CRT1}`),
    readFileSync(`./ssl/${process.env.CRT2 || env.CRT2}`),
    readFileSync(`./ssl/${process.env.CRT3 || env.CRT3}`),
  ]
});

server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
  let fd;
  const path = resolve(`./public${headers[":path"]}`)
  try {

    fd = openSync(path, 'r');
    const stat = fstatSync(fd);
    const headersRes = {
      'content-length': stat.size,
      'last-modified': stat.mtime.toUTCString(),
      'content-type': 'image/' + extname(headers[":path"]).slice(1)
    };
    stream.respondWithFD(fd, headersRes);
    console.log(headers[":path"] + " :: 200")
    stream.on('close', () => closeSync(fd));
  } catch (err) {
    /* Handle the error */
    ///console.log(err)
    console.log(headers[":path"] + " :: erro " + err.errno + " :: " + path)
    stream.respond({
      ':status': 404
    });
    stream.on('close', () => closeSync(fd));
  }
});

server.listen(process.env.PORT || 8443);