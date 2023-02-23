import { send, message } from '../../src/utils/ws'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import type { Friends } from '../../src/types/data'
import { sendCheckFriendsMail } from '../../src/utils/mail'
import config from '../../src/utils/config'
import dayjs from 'dayjs'
import { CronJob } from 'cron'

const path = './data/friends.json'

const getFriendList = (): Promise<Friends> => {
  return new Promise((resolve, reject) => {
    const syncId = Math.floor(Math.random() * 10000).toString()
    // @ts-ignore
    message((data) => {
      data.syncId == syncId && resolve(data?.data?.data!)
    })
    send({
      syncId: syncId,
      command: 'friendList',
      content: {}
    })
  })
}

interface FriendsData {
  date: string
  friends: Friends
}

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
  return JSON.parse(readFileSync('./data/friends.json', 'utf-8')) as FriendsData
}

const setData = (friends: Friends) => {
  writeFileSync(
    path,
    JSON.stringify({
      date: new Date(),
      friends
    })
  )
}

export const main = () => {
  new CronJob(
    config.checkFriend.time,
    async () => {
      const friends = await getFriendList()
      const data = getData()
      // 只检查是否减少 遍历旧数据，找新数据，找不到就是被删除
      const removed: Friends = []
      data.friends.forEach((friend) => {
        const f = friends.find((e) => {
          return e.id == friend.id
        })
        if (!f) {
          removed.push(friend)
        }
      })

      // 发送邮件
      if (removed.length > 0) {
        sendCheckFriendsMail(config.checkFriend.emailTo, {
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
      }
      // 写入数据
      setData(friends)
    },
    null,
    true
  )
}
