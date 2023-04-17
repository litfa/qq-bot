import { Router } from 'express'
import getMessageList from './getMessageList'
import getMessageRecord from './getMessageRecord'

const router = Router()

router.use('/getMessageList', getMessageList)
router.use('/getMessageRecord', getMessageRecord)

export default router
