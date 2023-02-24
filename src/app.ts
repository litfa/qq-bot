import { onMessage, open } from './utils/ws'
import { readdirSync } from 'fs'
import { logger } from './utils/log'

onMessage((message) => {
  logger.info(JSON.stringify(message))
})
const plugins = readdirSync('./plugins')
  .filter((e) => /^./.test(e))
  .forEach((e) => {
    require(`../plugins/${e}`).main()
  })
