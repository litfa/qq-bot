import config from './utils/config'
import { logger } from './utils/log'

config.plugins.forEach((e) => {
  logger.info(`加载插件 ${e} ./plugins/${e}`)
  const plugin = require(`./plugins/${e}`)
  plugin.Main && plugin.Main()
})
