const { program } = require('commander')
const Ora = require('./ora')
const path = require('path')
const fse = require('fs-extra')
const { toPascal } = require('./utils')
const { getModule, getController, getService } = require('./fragments')
const { ROOT } = require('./constant')

class Command {
  constructor() {}
  start() {
    this.create()
    // 生成版本号
    program.version('0.0.1')
    // 注入 argv
    program.parse(process.argv)
  }
  /**
   * @description create 命令,生成 nest.js 模块
   * @example  create <module> [options]
   */
  create() {
    program
      .command('create <module>')
      .alias('c')
      .description('生成模块,包含 module,control,provider')
      .action(async (module) => {
        const ora = new Ora(`正在生成模块[ ${module} ]...`.grey)
        // 模块名(大驼峰)
        const moduleName = toPascal(module)
        // 模块路径  如 /src/modules/Test
        const dirPath = path.resolve(ROOT, moduleName)

        if (fse.existsSync(dirPath)) {
          // 存在目录
          ora.fail(`[ ${dirPath} ]下存在文件夹 [ ${moduleName} ],模块生成失败.`)
        } else {
          // 创建目录
          try {
            await fse.mkdir(dirPath)
          } catch (error) {
            return ora.fail(`文件夹[ ${dirPath} ]创建失败,错误信息 [ ${error} ].`)
          }
          // 初始化path
          const moduleFileName = `${moduleName}.module.ts`
          const controlFileName = `${moduleName}.controller.ts`
          const serviceFileName = `${moduleName}.service.ts`
          const modulePath = path.resolve(dirPath, moduleFileName)
          const controlPath = path.resolve(dirPath, controlFileName)
          const servicePath = path.resolve(dirPath, serviceFileName)

          // 写文件
          try {
            await fse.writeFile(modulePath, getModule({ moduleName }))
            await fse.writeFile(controlPath, getController({ moduleName }))
            await fse.writeFile(servicePath, getService({ moduleName }))
          } catch (error) {
            return this.ora.fail(`模块[ ${moduleName} ]生成失败,错误信息:[ ${error} ].`)
          }
          this.ora.succeed(`模块[ ${moduleName} ]生成完毕!`)
        }
      })
  }
}

module.exports = new Command()
