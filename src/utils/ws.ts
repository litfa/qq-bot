// import WebSocket from 'ws'
import config from './config'
// import type data from '../types/data'

// const ws = new WebSocket(
//   `ws://${config.bot.host}:${config.bot.port}/all?verifyKey=${config.bot.verifyKey}&qq=${config.bot.qq}`
// )

// const send = (json: any) => {
//   if (typeof json == 'object') {
//     return ws.send(JSON.stringify(json))
//   } else {
//     return ws.send(json.toString())
//   }
// }

// const message = (data: (data: data) => void) => {
//   ws.on('message', (e) => {
//     // @ts-ignore
//     data(JSON.parse(e))
//   })
// }

// export { send, ws, message }

// import { CreateMiraiApi } from 'typescript-mirai-api-http'
import { CreateMiraiApi } from '../../../mirai-api-http-ts'

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
