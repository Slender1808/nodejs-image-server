const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/175054d19209152e.crt'),
  ca: [
    fs.readFileSync('./ssl/sf_bundle-g1.crt'),
    fs.readFileSync('./ssl/sf_bundle-g2.crt'),
    fs.readFileSync('./ssl/sf_bundle-g3.crt')
  ]
});

server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
  console.log(headers[":path"])
  let fd;

  try {
    fd = fs.openSync(`./public${headers[":path"]}`, 'r');
    const stat = fs.fstatSync(fd);
    const headersRes = {
      'content-length': stat.size,
      'last-modified': stat.mtime.toUTCString(),
      'content-type': 'text/plain; charset=utf-8'
    };
    stream.respondWithFD(fd, headersRes);
  } catch (err) {
    /* Handle the error */
    console.error(headers[":path"] + " erro 404")
    stream.respond({
      ':status': 404
    });
    stream.on('close', () => fs.closeSync(fd));
  } finally {
    console.error(headers[":path"] + " 200")
    stream.on('close', () => fs.closeSync(fd));
  }
});

server.listen(8443);