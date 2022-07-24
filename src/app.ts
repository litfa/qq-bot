import insertSql from './service/insertSql'
import { ws } from './utils/ws'
import cron from './service/cron'
import { readdirSync } from 'fs'

ws.on('open', () => {
  cron()
  insertSql()
})

const plugins = readdirSync('./plugins')

plugins
  .filter((e) => /^./.test(e))
  .forEach((e) => {
    require(`../plugins/${e}`).main()
  })

console.log(plugins)