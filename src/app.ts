import insertSql from './service/insertSql'
import { ws } from './utils/ws'
import cron from './service/cron'

ws.on('open', () => {
  cron()
  insertSql()
})