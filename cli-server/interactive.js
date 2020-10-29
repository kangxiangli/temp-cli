const inquirer = require('inquirer')//用户与命令行交互的工具
const { writeFile, pathResolve } = require('../bin/util')
const chalk = require('chalk')//用来在命令行输出不同颜色文字
const shell = require('shelljs')//使用它来消除shell脚本在UNIX上的依赖性，同时仍然保留其熟悉和强大的命令，即可执行Unix系统命令
const ora = require('ora')//加载（loading）的插件
const ejs = require('ejs')//模板语言
var moment = require('moment')//日期处理类库
console.info('kkkk-----')
const { setFileName,formatDate } = require('./util/index')
// 默认用户名，设置为git user name
let userName = shell.exec('git config user.name', { silent: true }).stdout
let gloableGroup
let gloableType
// 需要处理的步骤
const steps = [
  {
    name: 'type',
    message: '请选择模板类型',
    type: 'list',
    choices: ['filtersT', '带tab的表格', '普通表格']
  },
   {
    name: 'name',
    message: '请输入组件名称',
    suffix: '\n * 组件名称由小写字母 数字 中划线组成。\n',
    type: 'input',
    validate: (text) => {
      if (!!text && !!text.trim() &&text.match(/^[a-z0-9]+[a-z0-9-]*$/)) return true
      return false
    }
  },
  {
    name: 'cnName',
    message: '请输入中文名称',
    type: 'input',
    validate: (text) => !!text && !!text.trim()
  }, {
    name: 'isFolder',
    message: '是否创建文件夹',
    type: 'list',
    choices: [{
      name: '创建文件夹',
      value: true
    }, {
      name: '使用单文件',
      value: false
    }]
  }, {
    name: 'author',
    message: '请输入当前开发作者',
    default: (userName || '').trim(),
    type: 'input'
  }]

/**
 * 创建新组件时，交互式命令处理
 * @param {string} type md魔板类型 chart：图表 component：组件   utils：函数库
 * @param {object} config 组件配置数据
 */
module.exports = async function (type, { name, cnName, author, isFolder } = {}) {
  let stepList = [].concat(steps)
  // 没有输入类型，用户自行选择
  gloableType = type = type || (await inquirer.prompt(stepList[0])).type
  // 组件名称
  name = name || (await inquirer.prompt(stepList[1])).name
  // 组件中文名称
  cnName = cnName || (await inquirer.prompt(stepList[2])).cnName
  //是否创建文件夹
  isFolder = (await inquirer.prompt(stepList[3])).isFolder || false
  // 作者名
  author = author || (await inquirer.prompt(stepList[4])).author || 'IDSS'
  const res = {
    type,
    name,
    cnName,
    author,
    isFolder,
    curDate:moment().format('YYYY-MM-DD,h:mm:ss a')
  }
  const spinner = ora(chalk.yellow(`${type}组件模板初始化...`)).start()
  // 生成新模板
  try {
    const { getRelatePath,getTplContent } = require(`./temp/temp-${type}`)
    let pathStr = await getRelatePath(res)// 'C:\\v-svg-chain/src/views/kk.vue'
    let fileObj= {
      'service':'js',
      'vue':'vue',
      'table':'js',
    }
    let rPath
    console.log(chalk.green('\n开始写入文件....'));
    (['service', 'vue','table']).forEach(async fileType => {
      // 路径不存在不处理
     if (!pathStr) return
      let content = ejs.render(getTplContent(type, fileType),{
          ...res
        })
      if(isFolder){ // 创建文件夹时，生成为 vue生成{name}/index,server生成 {name}/server.js,table生成{name}/table.js
        rPath=fileType==='service'?`${pathStr}/service`:fileType==='table'?`${pathStr}/table`:`${pathStr}/index`
      }else{// 单个文件时，生成为 vue生成{name}.vue,server生成 {name}-server.js,table生成table.js
        rPath=fileType==='service'?`${pathStr}/${name}-service`:fileType==='table'?`${pathStr}/table`:`${pathStr}/${name}`
      }
    await writeFile(pathResolve(`${rPath}.${fileObj[fileType]}`), content, undefined)
    })

    console.log('\n')
    spinner.text = chalk.green(`${type}组件模板初始化成功`)
    spinner.succeed()
    console.log(chalk.green('\n successful,done！！！'))
  } catch (err) {
    spinner.text = chalk.red(`${type}组件模板初始化失败`)
    spinner.fail()
    console.log(chalk.red(`\n failed, ${err}`))
  }
}

