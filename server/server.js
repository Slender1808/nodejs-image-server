const http2 = require("http2");
const fs = require("fs");
const JSONPath = require("jsonpath");

const routes = require("./routes");
const dirTree = require("../modules/dirTree");

var dir = dirTree("public");

let data = JSON.stringify(dir);
fs.writeFileSync("base.json", data);

const server = http2.createSecureServer({
  key: fs.readFileSync("./localhost-privkey.pem"),
  cert: fs.readFileSync("./localhost-cert.pem"),
});

const result404 = JSONPath.query(
  dir,
  "$..[?(@.type=='file' && @.path=='public/semfoto.webp')]"
)[0];
result404.byte = fs.readFileSync(result404.path);

server.on("stream", (stream, headers) => {
  // stream is a Duplex
  let res = routes(headers[":path"], dir);
  console.log();
  if (res != 404) {
    stream.respond({
      "content-type": res.contentType,
      ":status": 200,
    });
    stream.end(res.byte);
  } else {
    stream.respond({
      "content-type": result404.contentType,
      ":status": 404,
    });
    stream.end(result404.byte);
  }
});

server.listen(8443);
console.log("Server On");
