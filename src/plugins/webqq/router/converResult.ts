import type {
  FriendMessageType,
  FriendSyncMessageType,
  GroupMessageType,
  GroupSyncMessageType
} from '../types/Message'

/**
 * 过滤 sender.id 和 subject.id 相同的字段
 */

export function converResult(
  message: FriendMessageType[],
  syncMessage: FriendSyncMessageType[]
): (FriendMessageType | FriendSyncMessageType)[]

export function converResult(
  message: GroupMessageType[],
  syncMessage: GroupSyncMessageType[]
): (GroupMessageType | GroupSyncMessageType)[]

export function converResult<T>(
  message: FriendMessageType[] | GroupMessageType[],
  syncMessage: FriendSyncMessageType[] | GroupSyncMessageType[]
) {
  const res: (
    | FriendMessageType
    | FriendSyncMessageType
    | GroupMessageType
    | GroupSyncMessageType
  )[] = []
  // 先循环message,找sync，如果没有，直接插入，如果有，插入日期更大的
  message.forEach((e) => {
    const sync = (syncMessage as FriendSyncMessageType[]).find((obj) => {
      return e.sender.id == obj.subject.id
    })
    // 如果存在，且日期更大 就保留日期更大的
    if (sync && sync.timestamp > e.timestamp) {
      return res.push(sync)
    }
    res.push(e)
  })
  // 再循环sync，找message,由于之前已经判断过，此时如果有相同，不操作，如果没有再插入
  syncMessage.forEach((e) => {
    const msg = (message as FriendMessageType[]).find((obj) => {
      return e.subject.id == obj.sender.id
    })
    if (!msg) {
      res.push(e)
    }
  })
  return res
}
