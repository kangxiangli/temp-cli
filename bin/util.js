/**
 * 下述语法，均采用 Node8 语法；部分方法可通过 Node12 快速替换！
 * __dirname 这里存在问题（在别的模块调用）
*/
const fs = require('fs') //引入node的fs模块
const path = require('path') //引入node的path模块
// 静默模式
// shell.config.silent = true
// 读文件
const readFile = function (fileName, isReturnObject = true) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, { encoding: 'utf8' }, (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(isReturnObject ? JSON.parse(data || '[]') : data)
    })
  })
}

/**
 * 写文件
 * @params fileName 文件名
 * @params data 文件数据
 * @params options 配置项
 *      - flag：文件打开的行为（打开文件用于写入。如果文件不存在则创建文件，如果文件已存在则截断文件）
 * https://ligang.blog.csdn.net/article/details/104336143
*/
const writeFile = function (fileName, data, options = { encoding: 'utf8', flag: 'w' }) {
  const dir = path.dirname(fileName)
  !fs.existsSync(dir) && fs.mkdirSync(dir)
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, options, err => {
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })
}
// 文件路径解析
const pathResolve = function (pathname) {
  return path.resolve(process.cwd(), pathname)
}

module.exports = {
  readFile,
  writeFile,
  pathResolve
}
