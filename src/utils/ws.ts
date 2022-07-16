import WebSocket from 'ws'
import config from './config'

const ws = new WebSocket(
  `ws://${config.bot.host}:${config.bot.port}/all?verifyKey=${config.bot.verifyKey}&qq=${config.bot.qq}`
)

const send = (e: any) => {
  if (typeof e == 'object') {
    return ws.send(JSON.stringify(e))
  } else {
    return ws.send(e.toString())
  }
}

export { send, ws }