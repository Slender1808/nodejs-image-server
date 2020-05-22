module.exports = function indexImg(header, dir) {
  const reqHeaders = header.split("/")
  if (reqHeaders.length >= 2) {
    let codString = "dir.children"
    for (let i = 0; i < reqHeaders.length; i++) if ("" != reqHeaders[i]) {
      let c = eval(codString + ".findIndex(obj => obj.name == reqHeaders[" + i + "])")
      if (!(c > -1)) return ["jpg", ""]
      c >= 0 && (codString = i == reqHeaders.length - 1 ? codString + "[" + c + "]" : codString + "[" + c + "].children")
    }
    result = [], result[0] = eval(codString + ".byte"), result[1] = eval(codString + ".ext.substring(1)")
  } else b = dir.children.findIndex(function (e) {
    return e.name == reqHeaders[1]
  }), result = [], result[0] = dir.children[b].byte, result[1] = dir.children[b].ext.substring(1)
  return result
}