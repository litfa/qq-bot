import config from '../../src/utils/config'
import { CronJob } from 'cron'
import { send } from '../../src/utils/ws'
import { readFileSync } from 'fs'

export const main = () => {
  config.cron.forEach((e) => {
    new CronJob(
      e.time,
      async () => {
        // 读取模板
        const template = readFileSync(`./template/${e.template}`, 'utf8')
        const messageChain = JSON.parse(template)
        // 群消息
        e.groups.forEach((group) => {
          send({
            'syncId': 123, // 消息同步的字段
            'command': 'sendGroupMessage', // 命令字
            'content': {
              group,
              messageChain: messageChain
            }
          })
        })
        // 好友消息
        e.friends.forEach((target) => {
          send({
            'syncId': 123, // 消息同步的字段
            'command': 'sendFriendMessage', // 命令字
            'content': {
              target,
              messageChain: messageChain
            }
          })
        })
      },
      null,
      true
    )
  })
}