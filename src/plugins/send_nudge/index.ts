import { onMessage, send } from '../../utils/ws'
import config from '../../utils/config'
import { logger } from '../../utils/log'

export const Main = () => {
  onMessage((data) => {
    if (
      data?.data?.type == 'FriendMessage' &&
      (data.data.sender.id == undefined ||
        data.data.sender.id == config.send_nudge.command_sender) &&
      data.data.messageChain[1]?.type == 'Plain' &&
      data.data.messageChain[1]?.text.indexOf(config.send_nudge.command) == 0
    ) {
      const command = data.data.messageChain[1].text
        .split(' ')
        .filter((e) => e != '')

      const group = command[1]
      const target = command[2]
      let count: string | number = command[3] || '1'

      if (Number(count) <= 0) {
        count = 1
      }
      logger.info(`在 ${group} 戳 ${target} ${count}次`)
      for(let i = 1; i <= Number(count); i++) {
        send({
          syncId: 0,
          command: 'sendNudge',
          content: {
            target,
            subject: group,
            kind: 'Group'
          }
        })
      }
    }
  })
}
