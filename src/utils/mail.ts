import config from './config'
import { createTransport } from 'nodemailer'
import { readFileSync } from 'fs'

const transport = createTransport(config.smtp)

const sendMail = transport.sendMail.bind(transport)

const formatHtml = (path: string, data: object) => {
  let html = readFileSync(path, 'utf-8')
  
  Object.keys(data).forEach((key) => {
    const htmlData = data[key as keyof typeof data]
    html = html.replaceAll(`{ ${key} }`, htmlData)
  })
  return html
}

const sendCheckFriendsMail = (to: string, data: Object) => {
  // @ts-ignore
  console.log(data.removed);
  
  console.log(formatHtml('./template/checkFriends.html', data));
  
  sendMail({
    from: config.smtp.from,
    to,
    html: formatHtml('./template/checkFriends.html', data)
  })
}

export { sendMail, sendCheckFriendsMail }
