import config from './config'
import { createTransport } from 'nodemailer'

const { sendMail } = createTransport(config.smtp)

export { sendMail }
