import log4js from 'log4js'

const LOG_FILE_PATH = 'logs/current.log'

log4js.configure({
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '[%d{MM/dd hh:mm:ss}] [%[%p%]] %m'
      }
    },
    app: {
      type: 'file',
      filename: LOG_FILE_PATH,
      layout: {
        type: 'pattern',
        pattern: '%d %p %m'
      }
    }
  },
  categories: {
    default: {
      appenders: ['out', 'app'],
      level: 'info'
    }
  }
})

const logger = log4js.getLogger('default')

export { logger }
