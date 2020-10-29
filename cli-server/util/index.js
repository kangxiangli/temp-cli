
/**
 * 数组扁平化处理函数
 * */
function arrayToFlat (arr) {
  if (!Array.isArray) {
    Array.isArray = function (arg) {
      return Object.prototype.toString.call(arg) === '[object Array]'
    }
  }
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? arrayToFlat(next) : next)
  }, [])
}

module.exports = {
  arrayToFlat
}
