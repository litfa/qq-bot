import config from './config'
import { logger } from './log'
import { CreateMiraiApi } from 'typescript-mirai-api-http'

const { host, port, qq, verifyKey } = config.bot

const {
  ws,
  send,
  sendGroupMessage,
  sendFriendMessage,
  close,
  error,
  message,
  open,
  onMessage,
  onGroupMessage,
  onFriendMessage,
  getFriendList,
  getGroupList,
  getMemberList,
  getLatestMemberList,
  getBotProfile,
  getFriendProfile,
  getMemberProfile,
  getUserProfile
} = CreateMiraiApi(host, port, verifyKey, qq)

open(() => {
  logger.info('ws 连接成功')
})
close(() => {
  logger.warn('ws 连接断开')
})
error(() => {
  logger.warn('ws 连接失败')
})
onMessage((data) => {
  console.log(JSON.stringify(data))
})

export {
  ws,
  send,
  sendGroupMessage,
  sendFriendMessage,
  close,
  error,
  message,
  open,
  onMessage,
  onGroupMessage,
  onFriendMessage,
  getFriendList,
  getGroupList,
  getMemberList,
  getLatestMemberList,
  getBotProfile,
  getFriendProfile,
  getMemberProfile,
  getUserProfile
}
