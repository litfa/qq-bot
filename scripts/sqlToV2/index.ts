import inquirer from 'inquirer'
import { createTable } from './createTable'
import { transferData } from './transferData'
import fix from './fix'
;(async () => {
  const { list } = await inquirer.prompt({
    type: 'list',
    name: 'list',
    default: false,
    message: '选择执行的操作',
    choices: ['新建表', '转移数据', '修复数据库报错']
  })
  if (list == '新建表') {
    createTable()
  } else if (list == '转移数据') {
    transferData()
  } else if (list == '修复数据库报错') {
    fix()
  }
})()
