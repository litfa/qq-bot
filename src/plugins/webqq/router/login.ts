import { Router } from 'express'
import config from '../../../utils/config'
import svgCaptcha from 'svg-captcha'
import { v4 as uuidV4 } from 'uuid'

const router = Router()

const { password } = config.webqq

const verificationCodes: { id: string; code: string; time: number }[] = []

router.post('/getCode', (req, res) => {
  const id = uuidV4()
  const { data, text } = svgCaptcha.create()
  verificationCodes.push({
    id,
    time: Date.now(),
    code: text.toLowerCase()
  })
  res.send({
    status: 200,
    data: {
      svg: data,
      id
    }
  })
})

router.post('/', (req, res) => {
  const { key, verificationCodeId, verificationCode } = req.body
  
  const code = verificationCodes.find((e) => e.id == verificationCodeId)
  if (!code) {
    return res.send({ status: 403 })
  }
  if (code.code !== verificationCode) {
    return res.send({ status: 403 })
  }
  if (code.time + 1000 * 60 * 2 < Date.now()) {
    return res.send({ status: 403 })
  }
  if (key !== password) {
    return res.send({ status: 403 })
  }

  res.send({
    status: 200
  })
})

export default router
