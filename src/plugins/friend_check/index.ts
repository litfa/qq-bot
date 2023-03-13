import { send, onMessage, getFriendList } from '../../utils/ws'
import type { Friend } from 'typescript-mirai-api-http/src/types/Common'
import { scheduleJob } from 'node-schedule'
import config from '../../utils/config'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { sendMail } from '../../utils/mail'
import formatHtml from '../../utils/formatHtml'
import dayjs from 'dayjs'
import to from 'await-to-js'
import { logger } from '../../utils/log'

const { time, emailTo, path } = config.friend_check

const template = readFileSync(config.friend_check.templatePath, 'utf-8')

/**
 * 获取上一次的数据
 */
const getData = () => {
  if (!existsSync(path)) {
    mkdirSync('./data/')
    writeFileSync(
      path,
      `{
      "date": "1970-1-1 08:00",
      "friends": []
    }`
    )
  }
  return JSON.parse(readFileSync('./data/friends.json', 'utf-8')) as {
    date: string
    friends: Friend[]
  }
}

/**
 * 写入新数据
 */
const setData = (friends: Friend[]) => {
  writeFileSync(
    path,
    JSON.stringify({
      date: new Date(),
      friends
    })
  )
}

export const Main = () => {
  scheduleJob(time, async () => {
    logger.info('开始检测好友')
    // 新的好友列表
    const friends = await getFriendList()
    // 旧的数据
    const data = getData()
    // 只检查是否减少 遍历旧数据，找新数据，找不到就是被删除
    // 被删除的放在这个数组
    const removed: Friend[] = []
    data.friends.forEach((friend) => {
      const f = friends?.data?.data?.find((e) => {
        return e.id == friend.id
      })
      if (!f) {
        removed.push(friend)
      }
    })
    // 遍历生成html结构，发送邮件
    if (removed.length > 0) {
      const [err, info] = await to(
        sendMail({
          from: config.smtp.from,
          to: config.friend_check.emailTo,
          html: formatHtml(template, {
            dataDate: dayjs(data.date).format('YYYY-MM-DD HH:mm:ss'),
            checkDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            removed: removed
              .map((e) => {
                return `<div data-id="${e.id}">
            <span class="id">${e.id}</span>
            <span class="nickname">${e.nickname}</span>
            <span class="remark">${e.remark}</span>
          </div>`
              })
              .join('')
          })
        })
      )
      if (err) {
        logger.error('邮件发送失败', err)
      }
    }
    logger.info(
      '好友检测：',
      removed.map((e) => `${e.id}, ${e.nickname}, ${e.remark}`).join('\r')
    )
    // 写入数据
    setData(friends?.data?.data)
  })
}
