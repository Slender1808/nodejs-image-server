module.exports = function searchReq(header, arrObj) {
  let arryHeaders = header.split("/")
  let req = arryHeaders.pop()
  let arrIndex = []
  let ind = 0
  for (let i = 0; i < arrObj.length; i++) {
    if (arrObj[i][req] != undefined) {
      arrIndex[ind] = arrObj[i][req]
      ind++
      break
    }
  }
  return arrIndex
}