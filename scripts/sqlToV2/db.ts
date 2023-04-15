import inquirer from 'inquirer'
import mysql from 'mysql'
import type { MysqlError } from 'mysql'
import config from '../../src/utils/config'

export const Query = async () => {
  const { host } = await inquirer.prompt({
    type: 'input',
    name: 'host',
    default: config.mysql.host,
    message: '旧数据库的 ip/域名(host)'
  })
  const { port } = await inquirer.prompt({
    type: 'input',
    name: 'port',
    default: config.mysql.port,
    message: '旧数据库的 端口(port)'
  })
  const { user } = await inquirer.prompt({
    type: 'input',
    name: 'user',
    default: config.mysql.user,
    message: '旧数据库的 用户名(user)'
  })
  const { password } = await inquirer.prompt({
    type: 'input',
    name: 'password',
    default: config.mysql.password,
    message: '旧数据库的 密码(password)'
  })
  const { database } = await inquirer.prompt({
    type: 'input',
    name: 'database',
    message: '旧数据库的 数据库(database)'
  })

  const db = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    charset: 'UTF8MB4_GENERAL_CI'
  })

  return <T = any>(sql: string, data?: any) => {
    return new Promise<[MysqlError | null, T]>((resolve, reject) => {
      db.query(sql, data, (err, results) => {
        if (err) {
          console.error('数据库报错', err)
        }
        resolve([err, results])
      })
    })
  }
}
