#!/usr/bin/env node
const cli = require('commander')
const chalk = require('chalk')
// 交互式生成模板
const interactive = require('../cli-server/interactive')

// 声明版本
cli.version('0.0.1')

// 生成表头带过滤器的表格等
cli
  .command('temp')
  .description('创建src/views/新文件请输入temp-cli')
  .on('--help', function () {
    console.log(chalk.green('\n 使用说明:\n\n 创建src/views/新文件，请输入: temp-cli'))
  })
  .action(() => {
    interactive('')
  })

// 如果输入的命令，没有在命令列表中
cli
  .arguments('<command>')
  .action((cmd) => {
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    cli.outputHelp()
  })

cli.parse(process.argv)

// 如果没有输入类型时，自动默认到 temp-cli temp命令中
if (!process.argv.splice(2).length) {

  interactive('')
}
