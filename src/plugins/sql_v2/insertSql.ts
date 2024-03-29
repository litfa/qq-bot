import { query } from '../../utils/db'
import { toUnderscoreCase, toSqlData } from './utils'
import { v4 as uuidV4 } from 'uuid'
import { Message } from 'typescript-mirai-api-http/dist/types/MessageType'
import { Event } from 'typescript-mirai-api-http/dist/types/EventType'

export const insertSql = (
  data: { syncId: number; data: Message | Event },
  transferConfig?: {
    date: Date
  }
) => {
  const types = [
    'BotGroupPermissionChangeEvent',
    'BotInvitedJoinGroupRequestEvent',
    'BotJoinGroupEvent',
    'BotLeaveEventDisband',
    'BotLeaveEventKick',
    'BotMuteEvent',
    'BotOfflineEventActive',
    'BotOfflineEventDropped',
    'BotOnlineEvent',
    'BotReloginEvent',
    'FriendInputStatusChangedEvent',
    'FriendMessage',
    'FriendNickChangedEvent',
    'FriendRecallEvent',
    'FriendSyncMessage',
    'GroupAllowAnonymousChatEvent',
    'GroupAllowConfessTalkEvent',
    'GroupMessage',
    'GroupMuteAllEvent',
    'GroupNameChangeEvent',
    'GroupRecallEvent',
    'GroupSyncMessage',
    'MemberCardChangeEvent',
    'MemberHonorChangeEvent',
    'MemberJoinEvent',
    'MemberJoinRequestEvent',
    'MemberLeaveEventKick',
    'MemberLeaveEventQuit',
    'MemberMuteEvent',
    'MemberPermissionChangeEvent',
    'MemberSpecialTitleChangeEvent',
    'MemberUnmuteEvent',
    'NewFriendRequestEvent',
    'NudgeEvent',
    'OtherClientOfflineEvent',
    'OtherClientOnlineEvent',
    'StrangerMessage',
    'TempMessage',
    'TempSyncMessage'
  ]
  if (!types.includes(data.data?.type)) {
    return
  }
  const date = transferConfig?.date || new Date()
  const uuid = uuidV4()
  const tosql = toSqlData(data.data, {
    date,
    timestamp: date.getTime(),
    uuid
  })

  // data.data.type 已经判断过，是39种类型，直接拼接是安全的
  const data1 = query(`insert into ${toUnderscoreCase(data.data.type)} set ?`, [
    tosql
  ])
  // 原格式
  const data2 = query('insert into message_text set ?', {
    date,
    timestamp: date.getTime(),
    uuid,
    text: JSON.stringify(data)
  })

  return [data1, data2]
}
