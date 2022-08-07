import { readFileSync } from 'fs'
import { parse } from 'yaml'

export default <
  {
    port: number
    bot: {
      host: string
      port: number
      verifyKey: string
      qq: number
    }
    mysql: {
      'host': string
      'port': number
      'user': string
      'password': string
      'database': string
    }
    cron: {
      time: string
      groups: number[]
      friends: number[]
      template: string
    }[]
    sendNudge: {
      command: string
      command_sender: number
    }
    MemberJoinRequest: {
      group: number
      regex: string
      minLevel: number
    }[]
  }
  >parse(readFileSync('config.yml', 'utf8'))