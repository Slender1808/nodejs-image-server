module.exports = function indexImg(header, dir) {
  const reqHeaders = header.split("/")
  if (reqHeaders.length >= 2) {
    var codString = "dir.children"
    for (let i = 0; i < reqHeaders.length; i++) {
      if (reqHeaders[i] != "") {
        var r = codString + ".findIndex(obj => obj.name == reqHeaders[" + i + "])"
        var c = eval(r)
        if (c >= 0) {
          if (i == reqHeaders.length - 1) {
            codString = codString + "[" + c + "]"
          } else {
            codString = codString + "[" + c + "].children"
          }
        }
      }
    }
    return eval(codString + ".byte")
  } else {
    const i = dir.children.findIndex(function (obj) {
      return obj.name == reqHeaders[1]
    })
    return dir.children[i].byte
  }
}