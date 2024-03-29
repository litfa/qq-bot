import { Router } from 'express'
import { query } from '../../../utils/db'
import { sqlToObj } from '../../sql_v2/utils'
import { FriendMessageType, FriendSyncMessageType } from '../types/Message'
import dayjs from 'dayjs'

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

const getMessageId = (message: FriendSyncMessageType) => {
  if (message.messageChain[0].type == 'Source') {
    return message.messageChain[0].id
  }
  return null
}

router.post('/friend', async (req, res) => {
  const {
    qq,
    lastId = 2147483647,
    limit = 100,
    maxTimestamp = dayjs().valueOf()
  } = req.body
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
  // 最大时间 & 最小时间
  // 最大时间: 上次请求查询的最小时间 
  // 最小时间：上次查询(别人发的消息 筛选出的100条)的最小时间
  const minTimestamp = friendMessage.at(-1)?.timestamp

  ;[err, result] = await query(
    'select * from friend_sync_message where timestamp>? and timestamp<? and subject__id=? order by timestamp desc limit ?;    ',
    [minTimestamp, maxTimestamp, qq, limit]
  )

  if (err) {
    return res.send({
      status: 500
    })
  }

  const syncMessage = (
    result.map(converResult) as FriendSyncMessageType[]
  ).filter((syncMessage, index, array) => {
    const id = getMessageId(syncMessage)
    const i = array.findIndex((e) => {
      return id == getMessageId(e)
    })
    if (i != index) {
      console.log(i, index, syncMessage)
    }
    return i == index
  })

  const message = [...friendMessage, ...syncMessage].sort((a, b) => {
    return a.timestamp - b.timestamp
  })

  res.send({
    status: 200,
    data: message
  })
})
router.post('/group', async (req, res) => {
  const {
    group,
    lastId = 2147483647,
    limit = 100,
    maxTimestamp = dayjs().valueOf()
  } = req.body
  let err,
    result
    // 先查100条群消息
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
  // 最大时间 最小时间 查区间内 => 最大时间 最小时间（上一次的最大时间）
  const minTimestamp = groupMessage.at(-1)?.timestamp

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
