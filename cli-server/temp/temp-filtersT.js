const fse = require('fs-extra')
const fs = require('fs')
const { writeFile, pathResolve, readFile } = require('../../bin/util')
const { getRegistedComponents,arrayToFlat } = require('../util/index.js')
const routerConfig = require('../../mock/sys/menus.json').content.routers
// 根路径处理
const base = {path: pathResolve('')}
// template path
let templatePath = pathResolve(`cli-server/temp/`)
/**
 * 通过配置参数获取关联的文件路径
 * @param {string} type 分组信息
 * @param {string} name 组件名称
 * @param {boolean} isFolder 是否是文件夹
 */
async function getRelatePath (config) {
  const { type, name, isFolder} = config
  let menuList = arrayToFlat(routerConfig)//扁平化后的路由
  let basePath = `${base.path}/src/views`
  if (name) {
    if (menuList.find((item)=>name===item.name)) {
      throw new Error(`${name}已经存在，请确认是否输入正确`)
    }
  } else if (!name && menuList.find((item)=>name===item.name)) {
    throw new Error(`${name}已经存在，请确认是否输入正确`)
  }
  return `${isFolder ? basePath+'/'+name : basePath}`
}

/**
 * 获取当前模板文件的tpl内容
 * @param {string} type 类型
 * @param {type} fileType 操作文件类型
 * @return {string}
 */
function getTplContent (type, fileType) {
  return fs.readFileSync(pathResolve(`${templatePath}/temp-${type}/${fileType}.tpl`), 'utf8')
}

module.exports = {
  getRelatePath,
  getTplContent
}
