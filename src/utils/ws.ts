import WebSocket from 'ws'
import config from './config'

const ws = new WebSocket(
  `ws://${config.bot.host}:${config.bot.port}/all?verifyKey=${config.bot.verifyKey}&qq=${config.bot.qq}`
)

const send = (json: any) => {
  if (typeof json == 'object') {
    return ws.send(JSON.stringify(json))
  } else {
    return ws.send(json.toString())
  }
}

const message = (data: (data: JSON) => void) => {
  ws.on('message', (e) => {
    // @ts-ignore
    data(JSON.parse(e))
  })
}

export { send, ws, message }