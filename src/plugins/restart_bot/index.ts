import { error, close, onMessage } from '../../utils/ws'
import config from '../../utils/config'
import { McsmApi } from '../../utils/mcsmanager'
import { logger } from '../../utils/log'
import { throttle } from '../../utils/throttle'
import { AxiosError } from 'axios'

const {
  apikey,
  mcsmurl,
  remote_uuid,
  uuid,
  count: maxCount,
  method,
  interval
} = config.restart_bot

const { kill, open, stop } = McsmApi(mcsmurl, apikey)

const useCount = (cb: () => void) => {
  let count = 0
  return () => {
    count++
    if (count > maxCount) {
      return
    }
    logger.info(`尝试第${count}次重启`)
    cb()
  }
}

const restart = throttle(
  useCount(async () => {
    try {
      if (method == 'kill') {
        const { data: killRes } = await kill(uuid, remote_uuid)
        if (killRes.status == 200) {
          logger.info('已kill实例')
        }
      } else {
        const { data: stopRes } = await stop(uuid, remote_uuid)
        if (stopRes.status == 200) {
          logger.info('已关闭实例')
        }
      }
    } catch (e) {
      return logger.error(
        '关闭实例时出错',
        (e as AxiosError).message,
        e.response
      )
    }
    setTimeout(async () => {
      try {
        const { data: openRes } = await open(uuid, remote_uuid)
        if (openRes.status == 200) {
          logger.info('已开启实例')
        }
      } catch (e) {
        logger.error('开启实例时出错', (e as AxiosError).message)
      }
    }, 5000)
  }),
  interval * 1000 * 60
)

error(restart)
close(restart)
onMessage((message) => {
  if (
    message.data.type == 'BotOfflineEventActive' ||
    message.data.type == 'BotOfflineEventForce' ||
    message.data.type == 'BotOfflineEventDropped'
  ) {
    restart()
  }
})
