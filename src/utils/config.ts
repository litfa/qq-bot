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
    smtp: {
      enable: boolean
      host: string,
      port: number,
      secure: boolean,
      from: string,
      auth: {
        user: string
        pass: string
      }
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
    checkFriend: {
      time: string,
      emailTo: string
    }
  }
  >parse(readFileSync('config.yml', 'utf8'))