import { message, send } from '../../src/utils/ws'
import config from '../../src/utils/config'

export const main = () => {
  message((data) => {
    if (
      (data.data?.sender?.id == config.sendNudge?.command_sender ||
        data.data?.sender == undefined) &&
      data.data?.messageChain &&
      data.data?.messageChain[1]?.text?.indexOf(config.sendNudge?.command) == 0
    ) {
      const command = data.data?.messageChain[1].text
        .split(' ')
        .filter((e) => e != '')
      console.log(command)

      const group = command[1]
      const target = command[2]
      let count = command[3] || 1
      if (count <= 0) {
        count = 1
      }
      for (let i = 1; i <= count; i++) {
        console.log({
          'syncId': 123, // 消息同步的字段
          'command': 'sendNudge', // 命令字
          'content': {
            target,
            subject: group,
            kind: 'Group'
          }
        })

        send({
          'syncId': 123, // 消息同步的字段
          'command': 'sendNudge', // 命令字
          'content': {
            target,
            subject: group,
            kind: 'Group'
          }
        })
      }
    }
  })
}

// const template = {
//   'syncId': '-1',
//   'data': {
//     'type': 'FriendMessage',
//     'messageChain': [
//       { 'type': 'Source', 'id': 57784, 'time': 1658655128 },
//       { 'type': 'Plain', 'text': '戳 1146936964 2102586642' }
//     ],
//     'sender': { 'id': 1585380249, 'nickname': 'XING', 'remark': 'XING' }
//   }
// }