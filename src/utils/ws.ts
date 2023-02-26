import config from './config'
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
  onFriendMessage
} = CreateMiraiApi(host, port, verifyKey, qq)

open(() => {
  console.log('ws 连接成功')
})
close(() => {
  console.log('ws 连接断开')
})
error(() => {
  console.log('ws 连接失败')
})
onMessage((data) => {
  JSON.stringify(data)
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
  onFriendMessage
}
