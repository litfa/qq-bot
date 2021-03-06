import { ws, message } from './utils/ws'
import { readdirSync } from 'fs'
import { logger } from './utils/log'

ws.on('open', () => {
  message((data) => {
    // console.log(
    //   `type: ${data.data?.type} sender: ${data.data?.sender?.id}-${
    //     data.data?.sender?.memberName
    //   } message: ${JSON.stringify(data.data?.messageChain)} group: ${
    //     data.data.sender?.group?.id
    //   }-${data.data.sender?.group?.name}`
    // )
    logger.info(JSON.stringify(data))

    // console.log(JSON.stringify(data))
  })
  const plugins = readdirSync('./plugins')

  plugins
    .filter((e) => /^./.test(e))
    .forEach((e) => {
      require(`../plugins/${e}`).main()
    })
})