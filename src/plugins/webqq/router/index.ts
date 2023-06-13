import { Router, static as expressStatic } from 'express'
import login from './login'
import getMessageList from './getMessageList'
import getMessageRecord from './getMessageRecord'
import search from './search'
import getProfile from './getProfile'
import config from '../../../utils/config'

const file = config.sql_v2.path

const router = Router()

router.use('/login', login)
router.use('/getMessageList', getMessageList)
router.use('/getMessageRecord', getMessageRecord)
router.use('/search', search)
router.use('/getProfile', getProfile)
if (file.Image && file.Voice) {
  router.use('/static/image', expressStatic(file.Image))
  router.use('/static/voice', expressStatic(file.Voice))
}

export default router
