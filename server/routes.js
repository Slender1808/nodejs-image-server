const JSONPath = require("jsonpath");

module.exports = function routes(headers, dir) {
  const result = JSONPath.query(
    dir,
    `$..[?(@.path == '${headers}')]`
  );

  return result[0];
};
