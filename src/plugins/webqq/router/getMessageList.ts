import { Router } from 'express'
import { query } from '../../../utils/db'
import { sqlToObj } from '../../sql-v2/utils'
import { converResult } from './converResult'
import type {
  FriendMessageType,
  FriendSyncMessageType,
  GroupMessageType,
  GroupSyncMessageType
} from '../types/Message'

const router = Router()

router.post('/', async (req, res) => {
  const timestamp = 1657547804000
  const data = await Promise.all([
    query(
      'select * from friend_message where timestamp > ? group by sender__id;',
      timestamp
    ),
    query(
      'select * from friend_sync_message where timestamp > ? group by subject__id;',
      timestamp
    ),
    query(
      'select * from group_message where timestamp > ? group by sender__group__id;',
      timestamp
    ),
    query(
      'select * from group_sync_message where timestamp > ? group by subject__id;',
      timestamp
    )
  ])

  const friendMessage = (data[0][1] as any[]).map(
    (e) => sqlToObj(e) as FriendMessageType
  )
  const friendSyncMessage = (data[1][1] as any[]).map(
    (e) => sqlToObj(e) as FriendSyncMessageType
  )
  const groupMessage = (data[2][1] as any[]).map(
    (e) => sqlToObj(e) as GroupMessageType
  )
  const groupSyncMessage = (data[3][1] as any[]).map(
    (e) => sqlToObj(e) as GroupSyncMessageType
  )

  const friendMessages = converResult(friendMessage, friendSyncMessage)
  const groupMessages = converResult(groupMessage, groupSyncMessage)

  res.send({
    code: 200,
    data: [...friendMessages, ...groupMessages]
  })
})

export default router
