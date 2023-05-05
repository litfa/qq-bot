import { Router } from 'express'
import login from './login'
import getMessageList from './getMessageList'
import getMessageRecord from './getMessageRecord'
import search from './search'

const router = Router()

router.use('/login', login)
router.use('/getMessageList', getMessageList)
router.use('/getMessageRecord', getMessageRecord)
router.use('/search', search)

export default router
