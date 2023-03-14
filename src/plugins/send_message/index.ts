import { onMessage, sendFriendMessage, sendGroupMessage } from '../../utils/ws'
import config from '../../utils/config'
import { readFileSync } from 'fs'
import { scheduleJob } from 'node-schedule'

export const Main = () => {
  config.send_message?.forEach(
    ({ templatePath, time, friends, groups }) => {
      scheduleJob(time, () => {
        // 读模板
        const template = readFileSync(templatePath, 'utf-8')
        const messageChain = JSON.parse(template)

        groups.forEach((group) => {
          sendGroupMessage(group, messageChain)
        })
        friends.forEach((friend) => {
          sendFriendMessage(friend, messageChain)
        })
      })
    }
  )
}
