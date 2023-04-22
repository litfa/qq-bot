import inquirer from 'inquirer'
import { createTable } from './createTable'
import { transferData } from './transferData'
;(async () => {
  const { list } = await inquirer.prompt({
    type: 'list',
    name: 'list',
    default: false,
    message: '选择执行的操作',
    choices: ['新建表', '转移数据']
  })
  if (list == '新建表') {
    createTable()
  } else if (list == '转移数据') {
    transferData()
  }
})()
