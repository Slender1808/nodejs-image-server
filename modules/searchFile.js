module.exports = function searchFile(header, dir, index) {
  //  /img/jpg-t.jpg
  const arryHeaders = header.split("/")
  //  [ '', 'img', 'jpg-t.jpg' ]

  let search = []
  for (let i = 1; i < arryHeaders.length; i++) {
    let file = arryHeaders[i]

    console.log(index)
    console.log(index.filter(obj => obj['img']))
    
    search[i] = 1 //index.filter(obj => obj[file])[0][file]
  }
  //  console.log(search)
  //  


  //  dir.children[0].children[0]
}