import { CronJob } from 'cron'
import config from '../utils/config'
import { send } from '../utils/ws'

export default () =>
  config.cron.forEach((e) => {
    new CronJob(
      e.cron,
      async () => {
        e.groups.forEach((group) => {
          send({
            'syncId': 123, // 消息同步的字段
            'command': 'sendGroupMessage', // 命令字
            'content': {
              group,
              messageChain: e.messageChain
            }
          })
        })
      },
      null,
      true
    )
  })