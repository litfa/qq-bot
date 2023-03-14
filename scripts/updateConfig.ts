import inquirer from 'inquirer'
import { readFileSync, writeFileSync } from 'fs'
import { parse } from 'yaml'
import { join, resolve } from 'path'

const readOldConfig = async (): Promise<{
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
    host: string
    port: number
    secure: boolean
    from: string
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
    time: string
    emailTo: string
  }
}> => {
  const { configPath } = await inquirer.prompt([
    {
      type: 'input',
      name: 'configPath',
      message:
        '配置文件位置(当前目录可直接填写config.yml 其他目录填写相对路径或绝对路径)'
    }
  ])

  const path = join(configPath)
  console.log(`读取旧配置 ${path}`)
  const oldConfigFile = readFileSync(path, 'utf-8')
  return parse(oldConfigFile)
}

const readNewConfig = () => {
  console.log('读取配置模板')
  const newConfigFile = readFileSync(
    join('./template/config.update.template.yml'),
    'utf-8'
  )
  return newConfigFile
}

const replace = async () => {
  const oldConfig = await readOldConfig()
  let newConfig = readNewConfig()
  const map = {
    'bot.host': oldConfig?.bot?.host,
    'bot.port': oldConfig?.bot?.port,
    'bot.verifyKey': oldConfig?.bot?.verifyKey,
    'bot.qq': oldConfig?.bot?.qq,
    'mysql.host': oldConfig?.mysql?.host,
    'mysql.port': oldConfig?.mysql?.port,
    'mysql.user': oldConfig?.mysql?.user,
    'mysql.password': oldConfig?.mysql?.password,
    'mysql.database': oldConfig?.mysql?.database,
    'smtp.host': oldConfig?.smtp?.host,
    'smtp.port': oldConfig?.smtp?.port,
    'smtp.secure': oldConfig?.smtp?.secure,
    'smtp.from': oldConfig?.smtp?.from,
    'smtp.auth.user': oldConfig?.smtp?.auth?.user,
    'smtp.auth.pass': oldConfig?.smtp?.auth?.pass,
    'send_nudge.command_sender': oldConfig?.sendNudge?.command_sender,
    'send_nudge.command': oldConfig?.sendNudge?.command,
    'friend_check.emailTo': oldConfig?.checkFriend?.emailTo,
    'friend_check.time': `'${oldConfig?.checkFriend?.time}'`,
    'friend_check.path': 'data/friends.json',
    'friend_check.template': 'template/friend_check.html'
  }

  // 替换map
  for (let i in map) {
    // @ts-ignore
    newConfig = newConfig.replace(`{ ${i} }`, map[i])
  }

  // 替换member_join_request
  {
    const reg = /<for-member_join_request>([\s\S]*)<\/for-member_join_request>/
    const content = reg.exec(newConfig) //?.at(1) || ''
    let text = ''
    // 循环每一项
    oldConfig?.MemberJoinRequest?.forEach((e) => {
      let item = content
      const map = {
        'member_join_request.group': e.group,
        'member_join_request.regex': e.regex,
        'member_join_request.minLevel': e.minLevel
      }
      for (let i in map) {
        // @ts-ignore
        item = item.replace(`{ ${i} }`, map[i])
      }
      text += item
    })
    console.log(text)

    // 替换
    newConfig = newConfig.replace(reg, text || '[]')
  }
  // send_message
  {
    const reg = /<for-send_message>([\s\S]*)<\/for-send_message>/
    const content = reg.exec(newConfig)?.at(1) || ''
    let text = ''
    oldConfig?.cron?.forEach((e) => {
      let item = content
      const map = {
        'send_message.time': `'${e.time}'`,
        'send_message.groups': JSON.stringify(e.groups),
        'send_message.friends': JSON.stringify(e.friends),
        'send_message.template': `template/${e.template}`
      }
      for (let i in map) {
        // @ts-ignore
        item = item.replace(`{ ${i} }`, map[i])
      }
      text += item
    })
    // 替换
    newConfig = newConfig.replace(reg, text || '[]')
  }
  return newConfig
}

const writeConfig = async (text: string) => {
  const path = resolve('config.yml')
  const { confirm } = await inquirer.prompt({
    type: 'confirm',
    name: 'confirm',
    message: `是否将转换后的配置写入 ${path} 文件将会被覆盖，请确认已将文件备份`
  })
  if (confirm) {
    writeFileSync(path, text)
  }
}

const run = async () => {
  const newConfig = await replace()
  console.log('转换完成', newConfig)
  await writeConfig(newConfig)
  console.log('请确认配置文件内容是否正确，检查文件格式、缩进是否正确，确认需要启用的插件，检查后可通过 yarn start 启动');
}

run()
