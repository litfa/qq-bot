import { Router } from 'express'
import { query } from '../../../utils/db'
import { sqlToObj } from '../../../plugins/sql_v2/utils'
import {
  FriendMessageType,
  FriendSyncMessageType,
  GroupMessageType,
  GroupSyncMessageType
} from '../types/Message'

const router = Router()

// 最大id & 最小id 的范围中查询
// 最大id： 上次查询的最小id
// 最小id： 消息查询结果的最小id

const searchGroupMessage = async (key: string, qq: number, lastId: number) => {
  const [err, results] = await query(
    'select * from group_message where id<? and sender__group__id=? and message_text like ? order by timestamp desc limit 100',
    [lastId, qq, `%${key}%`]
  )
  console.log(key)

  if (err) {
    return
  }

  return results.map(sqlToObj)
}
const searchGroupSyncMessage = async (
  key: string,
  qq: number,
  minId: number,
  maxId: number
) => {
  const [err, results] = await query(
    'select * from group_sync_message where subject__id=? and id<? and id>? and message_text like ? order by timestamp desc limit 100;',
    [qq, maxId, minId, `%${key}%`]
  )
  console.log(key)

  if (err) {
    return
  }

  return results.map(sqlToObj)
}
const searchFriendMessage = async (key: string, qq: number, lastId: number) => {
  const [err, results] = await query(
    'select * from friend_message where id<? and sender__id=? and message_text like ? order by timestamp desc limit 100',
    [lastId, qq, `%${key}%`]
  )
  console.log(key)

  if (err) {
    return
  }

  return results.map(sqlToObj)
}
const searchFriendSyncMessage = async (
  key: string,
  qq: number,
  minId: number,
  maxId: number
) => {
  const [err, results] = await query(
    'select * from friend_sync_message where subject__id=? and id<? and id>? and message_text like ? order by timestamp desc limit 100',
    [qq, maxId, minId, `%${key}%`]
  )
  console.log(key)

  if (err) {
    return
  }

  return results.map(sqlToObj)
}
// todo
router.post('/global', (req, res) => {})
router.post('/groupMessage', async (req, res) => {
  const { keyword, qq, lastId = 2147483647 } = req.body
  const groupMessage: GroupMessageType[] = await searchGroupMessage(
    keyword,
    qq,
    lastId
  )

  const groupSyncMessage: GroupSyncMessageType[] = await searchGroupSyncMessage(
    keyword,
    qq,
    groupMessage?.at(-1)?.id || 0,
    lastId
  )

  res.send({
    status: 200,
    data: [...groupMessage, ...groupSyncMessage].sort((a, b) => {
      return a.timestamp, b.timestamp
    })
  })
})
router.post('/friendMessage', async (req, res) => {
  const { keyword, qq, lastId = 2147483647 } = req.body
  const friendMessage: FriendMessageType[] = await searchFriendMessage(
    keyword,
    qq,
    lastId
  )

  const friendSyncMessage: FriendSyncMessageType[] =
    await searchFriendSyncMessage(keyword, qq, friendMessage?.at(-1)?.id || 0, lastId)

  res.send({
    status: 200,
    data: [...friendMessage, ...friendSyncMessage].sort((a, b) => {
      return a.timestamp - b.timestamp
    })
  })
})
// todo syncMessage
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
// todo syncMessage
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
