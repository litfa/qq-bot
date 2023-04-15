import inquirer from 'inquirer'
import { Query } from './db'
import { insertSql } from '../../src/plugins/sql-v2/insertSql'

export const transferData = async () => {
  const query = await Query()

  const queryData = async (lastId: number, step: number) => {
    const [err, res] = await query<{ text: string; date: string }[]>(
      'select * from message_text where id>? limit ?',
      [lastId, step]
    )
    if (err) {
      return console.log('数据库报错，请查看报错后重试', err)
    }
    return res
  }

  const { confirm } = await inquirer.prompt({
    type: 'confirm',
    name: 'confirm',
    default: false,
    message:
      '即将开始转移数据，请保持配置文件中为新的数据库配置，随后填写旧的数据库配置，转移工具会查询旧数据库的 message_text 表，并将其插入新的数据库'
  })

  if (!confirm) {
    console.log('取消')
    return process.exit()
  }

  console.log('查询总条数')
  const [err, count] = await query('select count(*) as count from message_text')
  if (err || count[0]?.count <= 0) {
    return console.log('查询失败, 请检查报错重试', err, count)
  }
  console.log(`查询到 ${count[0]?.count} 条数据`)
  const { start } = await inquirer.prompt({
    type: 'confirm',
    name: 'start',
    default: false,
    message: '即将开始转移数据，请确认已经备份，并确认数据库配置正确'
  })
  if (!start) {
    console.log('取消')
    return process.exit()
  }

  const step = 1000
  for (let i = 0; i < count[0].count / step; i++) {
    const last = i * step
    console.log(
      `开始转移第 ${last}-${Number(last) + step}/${count[0].count} 个`
    )
    const data = await queryData(last, step)
    if (data) {
      for (let j in data) {
        const res = insertSql(JSON.parse(data[j].text), {
          date: new Date(data[j].date)
        })
        if (res && res?.length >= 2) {
          const promiseData = [await res[0], await res[1]]
          console.log(
            `第${Number(last) + Number(j) + 1}/${count[0].count}项`,
            data[j],
            JSON.stringify(promiseData)
          )
        }
      }
    }
  }
}
