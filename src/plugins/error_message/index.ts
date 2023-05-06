import { error, close, onMessage } from '../../utils/ws'
import config from '../../utils/config'
import { sendMail } from '../../utils/mail'
import { throttle } from '../../utils/throttle'

const sendMessage = throttle(() => {
  sendMail({
    from: config.smtp.from,
    to: config.friend_check.emailTo,
    text: 'ws连接异常'
  })
}, config.error_message.interval * 1000 * 60)

error(sendMessage)
close(sendMessage)
onMessage((message) => {
  if (
    message.data.type == 'BotOfflineEventActive' ||
    message.data.type == 'BotOfflineEventForce' ||
    message.data.type == 'BotOfflineEventDropped'
  ) {
    sendMessage()
  }
})
