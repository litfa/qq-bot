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
plugins: ['hello-world', 'sql']
`

if (!existsSync('config.yml')) {
  writeFileSync('config.yml', defaultConfig, 'utf-8')
}

export default parse(readFileSync('config.yml', 'utf8')) as Config
