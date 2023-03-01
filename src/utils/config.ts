import { readFileSync, existsSync, writeFileSync } from 'fs'
import { parse } from 'yaml'

interface Config {
  plugins: string[]
  bot: {
    host: string
    port: number
    verifyKey: string
    qq: number
  }
  mysql: {
    host: string
    port: number
    user: string
    password: string
    database: string
  }
  send_nudge?: {
    command_sender: number
    command: string
  }
}

const defaultConfig = `
bot:
  host: localhost
  port: 4000
  verifyKey: admin123
  qq: 123456
mysql:
  host: localhost
  port: 3306
  user: root
  password: admin123
  database: qq_bot
# 开启的插件
plugins: ['hello_world', 'sql']
# 发送戳一戳消息
send_nudge:
  # 允许谁发送指令
  command_sender: 123456
  # 指令内容
  command: '戳'
`

if (!existsSync('config.yml')) {
  writeFileSync('config.yml', defaultConfig, 'utf-8')
}

export default parse(readFileSync('config.yml', 'utf8')) as Config