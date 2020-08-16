const http = require("http");
const fs = require("fs");
const JSONPath = require("jsonpath");
const { pipeline } = require("stream");
const zlib = require("zlib");

const routes = require("./routes");

// Carregando diretorio public
const dirTree = require("directory-tree");
const tree = dirTree("public");

// Salvando JSON do diretorio public
let data = JSON.stringify(tree);
fs.writeFileSync("base.json", data);

// Carregando imagem de 404
const result404 = JSONPath.query(
  tree,
  "$..[?(@.type=='file' && @.path=='public/semfoto.webp')]"
)[0];
result404.byte = fs.createReadStream(result404.path);

http
  .createServer((request, response) => {
    console.log(request.url);
    let raw;
    let res;

    res = routes(request.url, tree);
    console.log("-----------");
    console.log(res);
    if (res != 404) {
      if (res.type != "directory") {
        raw = fs.createReadStream(res.path);
        //request.setHeader('Content-Type', res.contentType);
      } else {
        raw = JSON.stringify(res);
        //request.setHeader('Content-Type', "application/json");
      }
    } else {
      raw = result404.byte;
    }

    // Store both a compressed and an uncompressed version of the resource.
    response.setHeader("Vary", "Accept-Encoding");
    //request.setHeader('content-type', res.contentType);
    let acceptEncoding = request.headers["accept-encoding"];
    if (!acceptEncoding) {
      acceptEncoding = "";
    }

    const onError = (err) => {
      if (err) {
        // If an error occurs, there's not much we can do because
        // the server has already sent the 200 response code and
        // some amount of data has already been sent to the client.
        // The best we can do is terminate the response immediately
        // and log the error.
        response.end();
        console.error("An error occurred:", err);
      }
    };

    // Note: This is not a conformant accept-encoding parser.
    // See https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3
    if (/\bdeflate\b/.test(acceptEncoding)) {
      response.writeHead(200, { "Content-Encoding": "deflate" });
      pipeline(raw, zlib.createDeflate(), response, onError);
    } else if (/\bgzip\b/.test(acceptEncoding)) {
      response.writeHead(200, { "Content-Encoding": "gzip" });
      pipeline(raw, zlib.createGzip(), response, onError);
    } else if (/\bbr\b/.test(acceptEncoding)) {
      response.writeHead(200, { "Content-Encoding": "br" });
      pipeline(raw, zlib.createBrotliCompress(), response, onError);
    } else {
      response.writeHead(200, {});
      pipeline(raw, response, onError);
    }
  })
  .listen(80);

console.log("Server On");
