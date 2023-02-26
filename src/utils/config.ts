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
}

const defaultConfig = `plugins: []
`

if (!existsSync('config.yml')) {
  writeFileSync('config.yml', defaultConfig, 'utf-8')
}

export default parse(readFileSync('config.yml', 'utf8')) as Config
