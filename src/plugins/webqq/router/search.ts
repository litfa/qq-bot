import { Router } from 'express'
import { query } from '../../../utils/db'
import { sqlToObj } from '../../../plugins/sql_v2/utils'

const router = Router()

const searchGroupMessage = async (key: string) => {
  const [err, results] = await query(
    'select * from group_message where message_text like ? order by timestamp limit 100',
    `%${key}%`
  )
  console.log(key)

  if (err) {
    return
  }

  return results.map(sqlToObj)
}

router.post('/global', (req, res) => {})
router.post('/groupMessage', async (req, res) => {
  const { keyword } = req.body
  const groupMessage = await searchGroupMessage(keyword)

  res.send({
    status: 200,
    data: groupMessage
  })
})
router.post('/friendMessage', (req, res) => {})
router.post('/groupMessageCount', async (req, res) => {
  const { keyword } = req.body
  const [err, results] = await query(
    'select *, count(*) as count from group_message where message_text like ? group by sender__group__id',
    `%${keyword}%`
  )

  if (err) {
    return res.send({ status: 500 })
  }

  res.send({ status: 200, data: results.map(sqlToObj) })
})
router.post('/friendMessageCount', async (req, res) => {
  const { keyword } = req.body
  const [err, results] = await query(
    'select *, count(*) as count from friend_message where message_text like ? group by sender__id',
    `%${keyword}%`
  )

  if (err) {
    return res.send({ status: 500 })
  }

  res.send({ status: 200, data: results.map(sqlToObj) })
})

export default router
