import { send, message } from '../../src/utils/ws'
import config from '../../src/utils/config'
import { logger } from '../../src/utils/log'
import type { UserProfile } from '../../src/types/userProfile'
import type Data from '../../src/types/data'

export const main = async () => {
  message(async (data) => {
    if (data.data?.type == 'MemberJoinRequestEvent') {
      const setting = config.MemberJoinRequest.find(e => e.group == data.data?.groupId)
      if (setting) {
        const answer = data.data.message?.split('\n答案：')[1]?.trim()
        const regex = new RegExp(setting.regex)
        if (regex.test(answer || '')) {
          // 获取用户资料
          const userProfile = await senGet('userProfile', {
            target: data.data.fromId
          })
          console.log(userProfile);

          if ((userProfile as UserProfile).data.level < setting.minLevel) {
            return logger.info('申请进群等级不足')
          }
          logger.info('申请进群通过')
          send({
            'syncId': 123, // 消息同步的字段
            'command': 'resp_memberJoinRequestEvent', // 命令字
            'content': {
              "eventId": data.data.eventId,
              "fromId": data.data.fromId,
              "groupId": data.data.groupId,
              "operate": 0,
              'message': ''
            }
          })
          console.log({
            'syncId': 123, // 消息同步的字段
            'command': 'resp_memberJoinRequestEvent', // 命令字
            'content': {
              "eventId": data.data.eventId,
              "fromId": data.data.fromId,
              "groupId": data.data.groupId,
              "operate": 0,
              'message': ''
            }
          });

        } else {
          logger.info('申请进群未通过 已忽略')
        }
      } else {
        logger.info('申请进群未设置')
      }
    }
  })
  // const data = await senGet('test', {})
  // console.log('data', data);

}

const listenMessage = (id: string) => {
  return new Promise((resolve) => {
    message((data) => {
      if (data.syncId == id) {
        resolve(data)
      }
    })
  })
}

const senGet = (command: string, content: any) => {
  const id = Math.floor(Math.random() * 1000000000).toString()
  send({
    syncId: id,
    command,
    content
  })
  return listenMessage(id)
}