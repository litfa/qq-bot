import { Router } from 'express'
import config from '../../../utils/config'

const router = Router()

const { password } = config.webqq

const verificationCodes: { id: string; code: string }[] = []

router.post('/', (req, res) => {
  const { key, verificationCodeId, verificationCode } = req.body
  // const code = verificationCodes.find((e) => e.id == verificationCodeId)
  // if (!code) {
  //   return res.send({ status: 403 })
  // }
  // if (code.code !== verificationCode) {
  //   return res.send({ status: 403 })
  // }
  if (key !== password) {
    return res.send({ status: 403 })
  }

  res.send({
    status: 200
  })
})

export default router
