import { Router } from 'express'
import { query } from '../../../utils/db'
import { sqlToObj } from '../../sql_v2/utils'
import { FriendMessageType, FriendSyncMessageType } from '../types/Message'

const router = Router()

const converResult = <T extends FriendMessageType | FriendSyncMessageType>(
  data: T
): T => {
  const res = sqlToObj(data) as T
  if (res.messageChain) {
    res.messageChain = JSON.parse(res.messageChain.toString())
  }
  return res
}

router.post('/friend', async (req, res) => {
  const { qq, lastId = 2147483647, limit = 100 } = req.body
  let err, result
  ;[err, result] = await query<FriendMessageType[]>(
    'select * from friend_message where id<? and sender__id=? order by timestamp desc limit ?',
    [lastId, qq, limit]
  )
  if (err) {
    return res.send({
      status: 500
    })
  }
  const friendMessage = result.map(converResult)
  const minTimestamp = friendMessage.at(-1)?.timestamp
  const maxTimestamp = friendMessage[0]?.timestamp

  ;[err, result] = await query(
    'select * from friend_sync_message where timestamp>? and timestamp<? and subject__id=? order by timestamp desc limit ?;    ',
    [minTimestamp, maxTimestamp, qq, limit]
  )

  if (err) {
    return res.send({
      status: 500
    })
  }

  const syncMessage = result.map(converResult) as FriendSyncMessageType[]

  const message = [...friendMessage, ...syncMessage].sort((a, b) => {
    return a.timestamp - b.timestamp
  })

  res.send({
    status: 200,
    data: message
  })
})
router.post('/group', async (req, res) => {
  const { group, lastId = 2147483647, limit = 100 } = req.body
  let err, result
  ;[err, result] = await query<FriendMessageType[]>(
    'select * from group_message where id<? and sender__group__id=? order by timestamp desc limit ?',
    [lastId, group, limit]
  )
  if (err) {
    return res.send({
      status: 500
    })
  }
  const groupMessage = result.map(converResult)
  const minTimestamp = groupMessage.at(-1)?.timestamp
  const maxTimestamp = groupMessage[0]?.timestamp

  ;[err, result] = await query(
    'select * from group_sync_message where timestamp>? and timestamp<? and subject__id=? order by timestamp desc limit ?;    ',
    [minTimestamp, maxTimestamp, group, limit]
  )

  if (err) {
    return res.send({
      status: 500
    })
  }

  const syncMessage = result.map(converResult) as FriendSyncMessageType[]

  const message = [...groupMessage, ...syncMessage].sort((a, b) => {
    return a.timestamp - b.timestamp
  })

  res.send({
    status: 200,
    data: message
  })
})

export default router
