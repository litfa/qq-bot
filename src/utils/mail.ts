import config from './config'
import { createTransport } from 'nodemailer'
import { readFileSync } from 'fs'
import Mail from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

const transport = createTransport(config.smtp)

export const sendMail = (
  mailOptions: Mail.Options
): Promise<SMTPTransport.SentMessageInfo> => {
  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        return reject(err)
      }
      resolve(info)
    })
  })
}
