const http = require("http");
const fs = require("fs");
const { pipeline } = require("stream");
const zlib = require("zlib");
const JSONPath = require("jsonpath");

// Carregando diretorio public
const dirTree = require("directory-tree");
const tree = dirTree("public");

JSONPath.apply(tree, "$..path", function (value) {
  return value.replace("public", "");
});

// Salvando JSON do diretorio public
let data = JSON.stringify(tree);
fs.writeFileSync("base.json", data);

// Carregando imagem de 404
const result404 = "image not found";

http
  .createServer((request, response) => {
    console.log(request.url);
    let raw;
    let codHTML = 200;

    // Busca pelo arquivo
    const res = JSONPath.query(tree, `$..[?(@.path == '${request.url}')]`);

    console.log("-----------");
    console.log(res);

    if (res[0] != undefined) {
      codHTML = 200;
      if (res[0].type != "directory") {
        raw = fs.createReadStream("public" + res[0].path);
      } else {
        raw = JSON.stringify(res);
      }
    } else {
      console.log("404");
      codHTML = 404;
      raw = result404;
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
      response.writeHead(codHTML, { "Content-Encoding": "deflate" });
      pipeline(raw, zlib.createDeflate(), response, onError);
    } else if (/\bgzip\b/.test(acceptEncoding)) {
      response.writeHead(codHTML, { "Content-Encoding": "gzip" });
      pipeline(raw, zlib.createGzip(), response, onError);
    } else if (/\bbr\b/.test(acceptEncoding)) {
      response.writeHead(codHTML, { "Content-Encoding": "br" });
      pipeline(raw, zlib.createBrotliCompress(), response, onError);
    } else {
      response.writeHead(codHTML, {});
      pipeline(raw, response, onError);
    }
  })
  .listen(80);

console.log("Server On");
