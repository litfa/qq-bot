import mysql, { MysqlError } from 'mysql'
import config from './config'
import { logger } from './log'

const { host, user, password, database, port } = config.mysql

logger.info(`连接数据库 ${host}:${port} ${user} ****** ${database}`)
export const db = mysql.createPool({
  host,
  port,
  user,
  password,
  database,
  charset: 'UTF8MB4_GENERAL_CI'
})

export const query = <T = any>(sql: string, values: any = '') => {
  return new Promise<[MysqlError, T]>((resolve, reject) => {
    db.query(sql, values, (err, results) => {
      if (err) {
        logger.error('数据库报错', err)
      }
      resolve([err, results])
    })
  })
}
