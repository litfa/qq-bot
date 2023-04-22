import { Router } from 'express'
import config from '../../../utils/config'
import svgCaptcha from 'svg-captcha'
import { v4 as uuidV4 } from 'uuid'
import token from '../utils/token'

const router = Router()

const { password } = config.webqq

const verificationCodes: {
  id: string
  code: string
  time: number
  status: 0 | 1
}[] = []

router.post('/getCode', (req, res) => {
  const id = uuidV4()
  const { data, text } = svgCaptcha.create()
  verificationCodes.push({
    id,
    time: Date.now(),
    code: text.toLowerCase(),
    // 0有效 1作废
    status: 0
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

  const code = verificationCodes.find(
    (e) => e.status == 0 && e.id == verificationCodeId
  )

  if (!code) {
    return res.send({ status: 403 })
  }

  // 作废
  code.status = 1

  console.log(verificationCodes)

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
    status: 200,
    data: {
      token: token({})
    }
  })
})

export default router
