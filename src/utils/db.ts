import mysql from 'mysql'
import config from './config'

const { host, user, password, database, port } = config.mysql

const db = mysql.createPool({
  host,
  port,
  user,
  password,
  database,
  charset: 'UTF8MB4_GENERAL_CI'
})

export default db

export const query = (sql: string, values: any = '') => {
  return new Promise<any>((resolve, reject) => {
    db.query(sql, values, (err, results) => {
      if (err) {
        // logger.error('数据库报错', err)
        console.error(err)
      }
      resolve([err, results])
    })
  })
}