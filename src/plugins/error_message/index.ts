import { error, close } from '../../utils/ws'
import config from '../../utils/config'
import { sendMail } from '../../utils/mail'

const throttle = (cb: () => void, time: number) => {
  let timeout: NodeJS.Timeout
  return () => {
    if (timeout) {
      return
    }
    timeout = setTimeout(() => {
      cb()
      timeout = null
    }, time)
  }
}

const sendMessage = throttle(() => {
  sendMail({
    from: config.smtp.from,
    to: config.friend_check.emailTo,
    text: 'ws连接异常'
  })
}, config.error_message.interval * 1000 * 60)

error(sendMessage)
close(sendMessage)
