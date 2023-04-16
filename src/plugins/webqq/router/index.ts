import { Router } from 'express'
import getMessageList from './getMessageList'

const router = Router()

router.use('/getMessageList', getMessageList)

export default router
