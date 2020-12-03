#!/usr/bin/env node

const program = require('commander')
let schemaObject = require('../src/schema')
const path = require('path')
schemaObject = schemaObject && schemaObject.default ? schemaObject.default : schemaObject
program
  .description('启动graphql服务')
  .option('-p --port <port>', '启动项目的端口号,默认3003号端口')
  .option('-d --dir <dir>', '必传，schema存放地址')  
  .action((commander) => {
      // 扫描schema并设置
      if (commander.port) {
          // TODO:验证端口号的可用性
        process.env.PORT = commander.port
      }
      if (commander.dir) {
        const schemaPath = path.resolve(process.cwd(), commander.dir)
        const schema = schemaObject.find(schemaPath)
        schemaObject.set(schema)
      } else {
        console.error('请传入schema的存放地址')
        process.exit(1)
      }

      require('../src')
  })


program.parse(process.argv);