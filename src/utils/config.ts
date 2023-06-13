import { readFileSync, existsSync, writeFileSync } from 'fs'
import { parse } from 'yaml'
import { logger } from './log'
import argvs from './argv'

const configPath = argvs.config || 'config.yml'

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
  smtp: {
    host: string
    port: number
    secure: boolean
    from: string
    auth: {
      user: string
      pass: string
    }
  }
  tencentCloud: {
    credential: {
      secretId: string
      secretKey: string
    }
  }
  send_nudge?: {
    commandSender: number
    command: string
  }
  friend_check: {
    time: string
    emailTo: string
    path: string
    templatePath: string
  }
  member_join_request: {
    group: number
    regex: string
    minLevel: number
  }[]
  send_message: {
    time: string
    groups: number[]
    friends: number[]
    templatePath: string
  }[]
  purge_cdn_cache: {
    commandSender: number
    command: string
    urls: {
      [name: string]: string
    }
  }
  sql_v2: {
    file_location: 'local' | 'cos' | 'none'
    cos?: {
      ImagePath: string
      VoicePath: string
      SecretId: string
      SecretKey: string
      Bucket: string
      Region: string
    }
    path?: {
      Image?: string
      Voice?: string
    }
  }
  webqq: {
    password: string
    jwtSecretKey: string
    baseUrl: string
    expiresIn: string
    port: number
    corsOrigin: string
  }
  error_message: {
    emailTo: string
    interval: number
  }
  restart_bot: {
    mcsmurl: string
    apikey: string
    uuid: string
    remote_uuid: string
    method: 'kill' | 'stop'
    count: number
    interval: number
  }
}
logger.info(`加载配置文件 ${configPath}`)
if (!existsSync(configPath)) {
  logger.warn('未找到配置文件，将尝试自动创建')
  try {
    const defaultConfig = readFileSync('./template/config.template.yml')
    writeFileSync(configPath, defaultConfig, 'utf-8')
  } catch (e) {
    logger.error(
      '配置文件创建失败，请手动复制 template/config.template.yml 为 config.yml 修改配置后重新启动'
    )
    process.exit()
  }
  logger.info('未找到配置文件，已自动创建，请修改 config.yml 配置并重新启动')
  process.exit()
}

const config = parse(readFileSync('config.yml', 'utf8')) as Config

export default config
