module.exports = function searchFile(header, dir, index) {
  console.log(header)
  //  /img/jpg-t.jpg

  const arryHeaders = header.split("/")
  console.log(arryHeaders)
  //  [ '', 'img', 'jpg-t.jpg' ]

  //console.log(index)
  let arrIndex = []
  let ind = 0
  for (let i = 1; i < arryHeaders.length; i++) {
    let file = arryHeaders[i]
    //  Buscando no index o file
    for (let i = 0; i < index.length; i++) {
      if (index[i][file] != undefined) {
        arrIndex[ind] = index[i][file]
        ind++
        break
      }
    }
  }
  console.log(arrIndex)
  //  [ 0, 0 ]

  let search = 'dir'
  for (let i = 0; i < arrIndex.length; i++) {
    search = search + '.children[' + arrIndex[i] + ']'
  }
  console.log(search)
  //  dir.children[0].children[0]

  return eval(search)
  //  {
  //    path: 'public/img/jpg-t.jpg',
  //    name: 'jpg-t.jpg',
  //    type: 'file',
  //    byte: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 01 00 60 00 60 00 00 ff db 00 84 00 06 04 05 06 05 04 06 06 05 06 07 07 06 08 0a 10 0a 0a 09 09 0a 14 0e 0f 0c ... 229837 more bytes>,
  //    ext: '.jpg'
  //  }
}