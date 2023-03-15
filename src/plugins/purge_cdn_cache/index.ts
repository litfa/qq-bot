import { onMessage, sendFriendMessage } from '../../utils/ws'
import config from '../../utils/config'
import { purgePathCache } from '../../utils/tencentCloudSdk'
import { logger } from '../../utils/log'
import to from 'await-to-js'

const formatCommand = (message: string) => {
  const res: {
    flushType: 'flush' | 'delete'
    urlEncode: boolean
    paths: string[]
  } = {
    flushType: 'flush',
    urlEncode: false,
    paths: []
  }
  const [command, ...paths] = message.split('\n')
  const commands = command.split(' ')
  if (commands[0] != config.purge_cdn_cache.command) {
    return
  }
  // 刷新全部缓存
  if (commands[1] == '1') {
    res.flushType = 'delete'
  }
  // url编码
  if (commands[2] == '1') {
    res.urlEncode = true
  }

  // 处理url
  paths.forEach((e) => {
    const urls = config.purge_cdn_cache?.urls
    // all
    if (e == 'all') {
      Object.entries(urls).forEach(([key, value]) => {
        res.paths.push(value)
      })
      return
    }
    // 在配置文件查找
    const url = urls && urls[e]
    res.paths.push(url ? url : e)
  })

  return res
}

export const Main = () => {
  onMessage(async (data) => {
    if (
      (data.data.type == 'FriendMessage' &&
        data.data.sender.id == config.purge_cdn_cache.commandSender) ||
      (data.data.type == 'FriendSyncMessage' &&
        data.data.subject.id == config.purge_cdn_cache.commandSender)
    ) {
      // 文本类型
      if (data.data.messageChain[1]?.type != 'Plain') {
        return
      }
      // 上面已经判断过了，从data里不好取值，直接用配置的
      const senderId  = config.purge_cdn_cache.commandSender
      // 解析命令
      const params = formatCommand(data.data.messageChain[1]?.text)
      if (!params) {
        return
      }

      const [err, res] = await to(
        purgePathCache(params.paths, params.flushType, params.urlEncode)
      )
      logger.info('刷新cdn缓存', err, res)

      sendFriendMessage(senderId, [
        {
          type: 'Plain',
          text: `刷新缓存 ${params.paths.join(' ')} \n ${JSON.stringify(res)} ${
            err ? JSON.stringify(err) + err?.message : '成功'
          }`
        }
      ])
    }
  })
}