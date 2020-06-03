let indice = []
module.exports = function indexFile(obj) {
  for (let i = 0; i < obj.children.length; i++) {
    
    const name = obj.children[i].name
    const arr = new Object([{ [name]: i }])
    indice.push(arr[0])
    if (obj.children[i].type == "folder") {
      indexFile(obj.children[i])
    }
  }
  //console.log(indice)
  return indice
}


