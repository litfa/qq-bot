import config from './utils/config'

config.plugins.forEach((e) => {
  console.log(`加载插件 ${e} ./plugins/${e}`)
  const plugin = require(`./plugins/${e}`)
  plugin.Main && plugin.Main()
})
