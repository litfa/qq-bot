import { Router } from 'express'
import login from './login'
import getMessageList from './getMessageList'
import getMessageRecord from './getMessageRecord'
import search from './search'
import getProfile from './getProfile'

const router = Router()

router.use('/login', login)
router.use('/getMessageList', getMessageList)
router.use('/getMessageRecord', getMessageRecord)
router.use('/search', search)
router.use('/getProfile', getProfile)

export default router
