import { Router } from 'express'
import { getBotProfile } from '../../../utils/ws'
import config from '../../../utils/config'

const { qq } = config.bot

const router = Router()

router.post('/getBotProfile', async (req, res) => {
  const { data } = await getBotProfile()
  res.send({
    code: 200,
    data: {
      profile: data,
      qq
    }
  })
})

export default router
