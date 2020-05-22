module.exports = function indexImg(header, dir) {
  const reqHeaders = header.split("/")
  if (reqHeaders.length >= 2) {
    let i = 1
    if (reqHeaders[i] != "") {
      console.log('> ' + reqHeaders[i])
      let r = dir.children.filter(obj => obj.name == reqHeaders[i])
      if(r[0] != null){
        dir = r[0]
        i = i + 1
        console.log('>> ' + reqHeaders[i])
        indexImg(header, dir)
      } else {
        console.log(dir)
        return [dir.byte, "jpg"]
      }
    }
  } else {
    console.log('else')
  }
}