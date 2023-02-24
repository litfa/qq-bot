
import config from './config'
import { CreateMiraiApi } from 'typescript-mirai-api-http'

const { onMessage, send, open, error, close } = CreateMiraiApi(
  config.bot.host,
  config.bot.port,
  config.bot.verifyKey,
  config.bot.qq
)

error(() => {
  console.log('ws 断连，将会尝试重新连接……')
})
close(() => {
  console.log('ws 断连，将会尝试重新连接……')
})
open(() => {
  console.log('ws 连接成功')
})

export { onMessage, send, open }
