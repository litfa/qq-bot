import insertSql from './service/insertSql'
import { ws, message } from './utils/ws'
import cron from './service/cron'
import { readdirSync } from 'fs'

ws.on('open', () => {
  // cron()
  // insertSql()
  message((data) => {
    // console.log(
    //   `type: ${data.data?.type} sender: ${data.data?.sender?.id}-${
    //     data.data?.sender?.memberName
    //   } message: ${JSON.stringify(data.data?.messageChain)} group: ${
    //     data.data.sender?.group?.id
    //   }-${data.data.sender?.group?.name}`
    // )
    console.log(JSON.stringify(data))
  })
  const plugins = readdirSync('./plugins')

  plugins
    .filter((e) => /^./.test(e))
    .forEach((e) => {
      require(`../plugins/${e}`).main()
    })
})

// console.log(plugins)