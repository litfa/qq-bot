import { logger } from './../../utils/log'
import config_ from './../../utils/config'
import { sendFriendMessage, onFriendMessage } from './../../utils/ws'

const config = config_.anti_zaima

export const Main = () => {
  onFriendMessage((message) => {
    // console.log(message.data)
    // 需是好友消息
    if (message.data.type !== 'FriendMessage') return
    // 需要是纯文字消息
    if (message.data.messageChain[1].type !== 'Plain') return
    // 消息长度需符合检测要求
    if (message.data.messageChain[1].text.length > config.max_length) return
    // 检测消息
    checkMessage(message.data.messageChain[1].text, message.data.sender.id)
  })
}

const checkMessage = (message: string, senderId: number) => {
  if (
    !new RegExp(
      config.rubbish_message
        .map((message) => message.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('|'),
      'i'
    ).test(message)
  )
    return

  logger.info(`${senderId} 正尝试向你发送垃圾信息 ( ${message} ) ，已自动回复`)

  // 发送消息
  sendFriendMessage(senderId, [{ type: 'Plain', text: config.send }])
}
