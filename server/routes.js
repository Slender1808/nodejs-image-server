const fs = require("fs");
const JSONPath = require("jsonpath");

module.exports = function routes(headers, dir) {
  const result = JSONPath.query(
    dir,
    `$..[?(@.path == '${headers.substr(1)}')]`
  );

  return result[0];
};
